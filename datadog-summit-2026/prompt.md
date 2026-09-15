# Set up Devin as the first responder for your Datadog alerts

Jared Zoneraich · Datadog Summit SF · September 2026 · https://devindatadog.com
HTML version: https://imjaredz.com/datadog-summit-2026/

This is the leave-behind from my talk, *Devin builds Devin*. It's the setup we run at Cognition: Datadog alerts land in a Slack channel, Devin picks each one up, investigates it with the Datadog MCP and our repos, and replies in the thread with a root cause. Humans review. Code changes only happen when the evidence says so.

**The rest of this page is written for Devin to read.** Hand it the URL and it will guide you through the setup step by step. You can also follow it yourself.

To start: open https://app.devin.ai and say

    Can we set up Jared's talk? devindatadog.com

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

1. Find **Datadog**. There are two entries: *Datadog (OAuth)*, which just asks them to authorize, and *Datadog (API key)*, which needs a `DD-API-KEY` and `DD-APPLICATION-KEY` from Datadog → Organization Settings → API Keys / Application Keys. OAuth is simpler if it's offered for their site.
2. Select their Datadog site/region (e.g. `datadoghq.com`, `datadoghq.eu`).
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

**1. Give the agents a shared scratchpad.** Alerting products produce duplicate alerts. Every Devin in the loop reads and writes one shared Markdown file, the same way humans share a runbook or a postmortem. That's how a new session knows this alert is the one from last week, and what was found then.

**2. Don't force code changes.** Our alert investigations went up 75% in the first six weeks, and under 2% of them resulted in (or should have resulted in) a code change. We told the agent it doesn't have to push code at the end. Sometimes an investigation is a no-op or a learning. That saved a lot of time and money.

**3. Different agents for different tasks.** A triage Devin that is told *not* to investigate root causes, just to classify and route. An investigation Devin that digs in. A separate Devin, with its own prompt and its own access, if code needs to change. Different jobs, different prompts, different permissions.

## If you're not using Devin

The pattern still holds. You need: a dedicated alerts channel, an agent that is triggered per message, read access to your observability data (Datadog's MCP server works with any MCP client), a shared file it can use as memory, and an explicit instruction not to open PRs by default. Start with one low-severity monitor and grow from there.

## Links

- Devin auto-triage guide: https://docs.devin.ai/product-guides/auto-triage
- Devin Automations (templates, triggers, limits): https://docs.devin.ai/product-guides/automations
- Devin ↔ Datadog integration: https://docs.devin.ai/enterprise/integrations/datadog
- Datadog Slack integration: https://docs.datadoghq.com/integrations/slack/
- https://devin.ai/auto-triage
- Questions: https://x.com/imjaredz
