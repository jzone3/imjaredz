# Set up Devin as the first responder for your Datadog alerts

Jared Zoneraich · Datadog Summit SF · September 2026 · https://devindatadog.com
HTML version: https://imjaredz.com/datadog-summit-2026/

This is the leave-behind from my Datadog Summit talk, *Devin builds Devin*. Quick version: our team is a little under 3x the size it was in November 2025, we're shipping 40x more PRs, and agents write basically all of our code now. More code means more alerts, and our Datadog alerts were through the roof. Humans can't even get through that backlog. So we made Devin the first responder to every single alert.

Every alert gets piped into Slack. Devin picks it up, pulls whatever it needs from Datadog, git, and Slack, and replies in the thread with what it thinks happened. From there we work with it like a teammate. Code changes only happen when the evidence says so, and honestly that's rare.

**The rest of this page is written for Devin, not for you.** Hand it the URL and it'll walk you through the setup step by step. Or read it yourself. None of this is hard.

To start: open https://app.devin.ai (or @Devin in Slack) and paste

    I just saw Jared Zoneraich's Datadog Summit talk on using Devin as the first responder for Datadog alerts, and I want the same setup for my team: Datadog alerts post to a Slack channel, a Devin automation picks up each alert, investigates it with the Datadog MCP and our repos, and replies in the thread with a root cause (a PR only if the evidence warrants one).

    Read https://imjaredz.com/datadog-summit-2026/ first. Then guide me through the setup one step at a time: tell me exactly what to click in Slack, Datadog, and the Devin app, do the parts you can do yourself, and wait for me to confirm each step before moving on.

## What you end up with

```
Datadog monitor
    │  @slack-alerts
    ▼
Slack #alerts  ◀──────────────────────────────────┐
    │  new message                                │ reply in thread:
    ▼                                             │ root cause, confidence,
Triage Devin (always on)                          │ next step, @owner,
    • noise? duplicate? → link to existing thread │ PR link only if warranted
    • shared scratchpad = memory across alerts    │
    • actionable → spawn a child                  │
    ▼                                             │
Investigation Devin (one per alert) ──────────────┘
    • Datadog MCP: logs, metrics, traces, monitors
    • git log, recent deploys, the code
    • prior investigations
    • ~98% end in a diagnosis, <2% in a PR
```

That's the whole thing. One real investigation on our side: 45 Datadog calls, 7 code searches, 4 file reads, 7 git commands, 32 Slack messages read, and then one message back in the thread. The hard part isn't the wiring. It's letting the agent find the signal in the noise, and letting it learn from how it triaged last time.

## Instructions for Devin

Devin: the person you're talking to just saw a talk about how Cognition uses you as the first responder for its own Datadog alerts. They want the same setup for their team. Your job is to **guide them through it step by step**, in order, one step at a time.

Ground rules:

- Some steps are clicks in Slack, Datadog, or the Devin app that only they can do. For those, give exact instructions, then **wait for them to confirm** before moving on.
- Do the parts you can do yourself: draft the setup prompt, create the automation if you have the tools to, run the test.
- Read https://docs.devin.ai/product-guides/auto-triage and https://docs.devin.ai/product-guides/automations before you begin so your instructions match the current UI. If the docs and this page disagree, trust the docs.
- Never ask them to paste API keys, application keys, or tokens into the chat. Keys go into the Devin app's connection settings only.

### Step 0 — Ask three questions

1. Which Slack channel do (or should) Datadog alerts post to? Recommend a **dedicated** channel like `#alerts` or `#incidents`, not a general engineering channel.
2. Which repos and services are behind those alerts? Confirm those repos are connected to Devin.
3. Is Datadog already posting into Slack? If yes, skip Step 1.

### Step 1 — Datadog → Slack

They do this in Datadog and Slack. Docs: https://docs.datadoghq.com/integrations/slack/

1. In Datadog, install the Slack integration (Integrations → Slack) and authorize the workspace.
2. In Slack, run `/invite @Datadog` in the alerts channel.
3. In each monitor they want triaged, add `@slack-<channel-name>` to the notification message. Start with **one warning-level monitor**, not everything.

### Step 2 — Connect Slack to Devin

They do this in the Devin app: **Settings → Connections → Slack**. The Devin Slack app needs to be installed in the workspace, and their **personal** Slack account needs to be connected. Automations that watch Slack won't work without the personal connection.

### Step 3 — Connect Datadog to Devin (MCP)

They do this in the Devin app: **Settings → Connections → MCPs** (the MCP Marketplace). Docs: https://docs.devin.ai/enterprise/integrations/datadog

1. Find **Datadog** and click **Enable**.
2. Select their Datadog site/region (e.g. `datadoghq.com`, `datadoghq.eu`), then enter a `DD-API-KEY` and `DD-APPLICATION-KEY`. They create those in Datadog → Organization Settings → API Keys / Application Keys. (API keys are the only auth the Datadog MCP supports today.)
3. Click **Test listing tools**. It should list tools for logs, metrics, monitors, and traces.

Once this is done, verify it yourself if you can: ask Datadog for the list of active monitors and confirm you get results.

### Step 4 — Invite Devin to the channel

In Slack, in the alerts channel: `/invite @Devin`. Devin must be a member of the channel for the automation to see messages.

### Step 5 — Create the automation

In the Devin app, go to **Automations**. Two ways to do it:

- **Template (recommended):** click *View all examples* and pick **Triage Bug Reports**. This uses the *Triage Devin* action type: one persistent Devin watches the channel, dedupes, and spawns a child Devin per actionable alert. It has a shared scratchpad for memory. This is the architecture from the talk.
- **Simpler alternative:** the **Investigate Alerts Triggered** template. Trigger = Slack message in the channel, action = start a new session that uses the Datadog MCP and replies in the thread. No persistent monitor, no memory, but fewer moving parts.

Select the alerts channel, then paste the setup prompt below into the prompt/instructions field. Adapt the service names, channel name, and owners to what they told you in Step 0.

```
You are the first responder for Datadog alerts posted in #alerts.

For every new message:
1. Decide: actionable, duplicate, or noise. If it's a repeat of an alert you have
   already seen, reply with a link to the existing thread and stop. Track what you
   have seen in your scratchpad.
2. If actionable, investigate. Use the Datadog MCP to pull the relevant logs, metrics,
   traces, and monitor history for the service in the alert. Check recent deploys and
   commits in the related repo. Read prior investigations in your scratchpad first so
   you don't repeat work.
3. Reply in the alert's Slack thread with: what happened, when it started, the most
   likely root cause, your confidence, and the recommended next step. Tag the likely
   code owner. Keep it short.
4. Do not force a code change. Most alerts end in a diagnosis, a no-op, or a
   config/infra recommendation. Only open a PR when the fix is small and the evidence
   is clear. Otherwise, hand off: say exactly what a follow-up session should do.
5. Learn from corrections. If a human replies with a correction (wrong owner, wrong
   service, known issue), update your scratchpad.

Pull only the data you need. Don't dump every log and metric into the thread.
```

### Step 6 — Guardrails before saving

- **ACU limit** per session, so one alert can't run away.
- **Invocation limit**, e.g. 10 per hour, so an alert storm can't spawn dozens of sessions.
- **Network policy** on, since Slack messages are untrusted input.
- Confirm the automation only has Slack access to the alerts channel unless they want more.

Then save and make sure the automation is **enabled**.

### Step 7 — Test it

1. Have them trigger the warning-level monitor from Step 1 (or temporarily lower its threshold), or post a realistic fake alert in the channel.
2. Confirm Devin replies in the thread within a few minutes. If it doesn't, check in order: Devin is in the channel (Step 4), personal Slack connection (Step 2), the automation is enabled and pointed at the right channel (Step 5), invocation history on the Automations page.
3. Read the reply together. If it tagged the wrong person or misread the alert, reply in the thread with the correction. The Triage Devin updates its scratchpad and gets it right next time.

### Step 8 — Level up (later, not today)

- Add **Knowledge** in Devin describing their services, normal thresholds, and runbooks. Investigation quality jumps.
- Route more monitors to the channel, low severity first.
- Split roles: keep the triage Devin narrow (Slack + Datadog, read-only), and give a separate implementation Devin repo write access with its own prompt. Different jobs, different prompts, different permissions.
- No Slack in the loop? Automations also have a **webhook trigger** Datadog can post to directly, and there's an API pattern at https://docs.devin.ai/use-cases/gallery/api-datadog-alert-investigation

When everything works, summarize what was set up, where each setting lives, and how to turn it off.

## Three things we learned running this

**1. Devins need shared memory.** If you use an alerting product, you get tons of duplicate alerts, because things keep going off. Your agent needs the full context of its previous runs. Honestly, solving this is not that hard: we just gave it a Markdown file with read and write access. Same way humans share a runbook or a postmortem. Models are good enough now that the agents figure out the rest.

**2. Don't force code changes.** Our alert volume was up 75% in the first six weeks, and less than 2% of the investigations actually resulted in a code change, or should have. So we tweaked the agent: you don't have to push code at the end. Sometimes an investigation is a no-op, or just a learning. Not everything needs a PR. That saved a lot of money and a lot of time.

**3. Different agents for different tasks.** We have a triage Devin that's told *not* to investigate root causes, just triage, point to previous results, and hand off. An investigation Devin whose job is the diagnosis, not the PR. And a separate Devin with write access for when code actually needs to change. Agents are good at doing one thing specifically. It's the same Devin under the hood, just different prompts and different permissions.

## If you're not using Devin

Of course I want you to use Devin, but this should be useful if you're building it yourself too. You need a dedicated alerts channel, an agent that gets kicked off per message, read access to your observability data (Datadog's MCP server works with any MCP client), a Markdown file it can read and write as memory, and an explicit instruction that it doesn't have to open a PR. Start with one low-severity monitor. You don't need to be a cutting-edge AI company to do this.

## Links

- Devin auto-triage guide: https://docs.devin.ai/product-guides/auto-triage
- Devin Automations (templates, triggers, limits): https://docs.devin.ai/product-guides/automations
- Devin ↔ Datadog integration: https://docs.devin.ai/enterprise/integrations/datadog
- Datadog Slack integration: https://docs.datadoghq.com/integrations/slack/
- https://devin.ai/auto-triage
- Questions: https://x.com/imjaredz
