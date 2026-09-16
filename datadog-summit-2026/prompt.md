# Set up Devin as the first responder for your Datadog alerts

Jared Zoneraich · Datadog Summit SF · September 2026 · https://devindatadog.com
HTML version: https://imjaredz.com/datadog-summit-2026/

This is the leave-behind from my Datadog Summit keynote, *Devin builds Devin*. Quick version: agents write basically all of our code now, and our team isn't growing anywhere near as fast as the code is. More code means more alerts, and our Datadog alerts were through the roof. Humans can't even get through that backlog. So we made Devin the first responder to every single alert.

Every alert gets piped into Slack. Devin picks it up, pulls whatever it needs from Datadog, git, and Slack, and replies in the thread with what it thinks happened. From there we work with it like a teammate. Code changes only happen when a human asks for them.

**The rest of this page is written for Devin, not for you.** Hand it the URL and it'll walk you through the setup step by step. Or read it yourself. None of this is hard.

To start: open https://app.devin.ai (or @Devin in Slack) and paste

    I just saw Jared Zoneraich's Datadog Summit keynote on using Devin as the first responder for Datadog alerts, and I want the same setup for my team: Datadog alerts post to a Slack channel, a Devin automation picks up each alert, investigates it with the Datadog MCP and our repos, and replies in the thread with a root cause (a PR only when a human asks for one).

    Read https://imjaredz.com/datadog-summit-2026/ first. Then guide me through the setup one step at a time: tell me exactly what to click in Slack, Datadog, and the Devin app, do the parts you can do yourself, and wait for me to confirm each step before moving on.

## What you end up with

```
Datadog monitor
    │  @slack-alerts
    ▼
Slack #alerts  ◀────────────────────────┐
    │  new alert message                │  reply in the thread:
    ▼                                   │  what happened, root cause,
Triage Devin (one automation)           │  confidence, next step, @owner,
    • filters noise, groups duplicates  │  PR only if a human asks
    • investigates with Datadog MCP,    │
      git, the code, past alerts ───────┘
```

That's the whole thing. In a real investigation, Devin is making dozens of Datadog calls, searching the repo, running git commands, and reading the Slack history, and then sending one message back in the thread. The hard part isn't the wiring. It's letting the agent find the signal in the noise, and letting it learn from how it triaged last time.

## Instructions for Devin

Devin: the person you're talking to just saw a keynote about how Cognition uses you as the first responder for its own Datadog alerts. They want the same setup for their team. Your job is to **guide them through it step by step**, in order, one step at a time.

Ground rules:

- Some steps are clicks in Slack, Datadog, or the Devin app that only they can do. For those, give exact instructions, then **wait for them to confirm** before moving on.
- **Do it yourself wherever you can.** You have tools for managing Devin itself (listing integrations and MCP servers, listing and creating automations, finding settings pages) plus your own knowledge of how Devin works. Use them to set things up programmatically instead of dictating clicks: draft the setup prompt, create the automation, run the test. Only fall back to step-by-step UI instructions for things you genuinely can't do from a session (Slack `/invite`, the Datadog UI, their personal Slack connection, entering API keys).
- **Check before you ask.** Most of these steps may already be done. At the start of each step, use your own tools to check (each step says how). If it's done, say so and skip it. Only ask them to do something you've confirmed isn't set up.
- Read https://docs.devin.ai/product-guides/auto-triage and https://docs.devin.ai/product-guides/automations before you begin so your instructions match the current UI. If the docs and this page disagree, trust the docs.
- Never ask them to paste API keys, application keys, or tokens into the chat. Keys go into the Devin app's connection settings only.

### Step 0 — Ask three questions

1. Which Slack channel do (or should) Datadog alerts post to? Recommend a **dedicated** channel like `#alerts` or `#incidents`, not a general engineering channel.
2. Which repos and services are behind those alerts? List the repos you have access to and confirm those are among them.
3. Is Datadog already posting into Slack? If you can read the channel, check its recent history for Datadog messages yourself. If yes, skip Step 1.

### Step 1 — Datadog → Slack

*Check first:* if the Datadog MCP is already connected (Step 3), list their monitors and look for `@slack-` handles in the notification messages. If the channel history already has Datadog alerts, skip this step.

They do this in Datadog and Slack. Docs: https://docs.datadoghq.com/integrations/slack/

1. In Datadog, install the Slack integration (Integrations → Slack) and authorize the workspace.
2. In Slack, run `/invite @Datadog` in the alerts channel.
3. In each monitor they want triaged, add `@slack-<channel-name>` to the notification message. Start with **one warning-level monitor**, not everything.

### Step 2 — Connect Slack to Devin

*Check first:* if you can list the org's integrations, check whether Slack shows as connected. Otherwise: do you have Slack tools in this session, and can you look up the alerts channel by name? If yes, the Devin Slack app is installed in the workspace. You can't see whether *their* personal account is connected, so ask them to confirm that one thing in **Settings → Connections → Slack** rather than walking them through the whole step.

They do this in the Devin app: **Settings → Connections → Slack**. The Devin Slack app needs to be installed in the workspace, and their **personal** Slack account needs to be connected. Automations that watch Slack won't work without the personal connection.

### Step 3 — Connect Datadog to Devin (MCP)

*Check first:* list your MCP servers. If Datadog is there, call it (list monitors) to confirm it works, and skip to Step 4. If it isn't and you can install MCP servers from the marketplace, install Datadog yourself; the only part they have to do is enter the keys on the settings page.

They do this in the Devin app: **Settings → Connections → MCPs** (the MCP Marketplace). Docs: https://docs.devin.ai/enterprise/integrations/datadog

1. Find **Datadog** and click **Enable**.
2. Select their Datadog site/region (e.g. `datadoghq.com`, `datadoghq.eu`), then enter a `DD-API-KEY` and `DD-APPLICATION-KEY`. They create those in Datadog → Organization Settings → API Keys / Application Keys. (API keys are the only auth the Datadog MCP supports today.)
3. Click **Test listing tools**. It should list tools for logs, metrics, monitors, and traces.

Once this is done, verify it yourself if you can: ask Datadog for the list of active monitors and confirm you get results.

### Step 4 — Invite Devin to the channel

*Check first:* try to read the alerts channel's recent history with your Slack tools. Finding the channel by name isn't enough (public channels show up either way); you need to actually get messages back. If you do, you're a member; skip this step. If lookup works but reading fails, you're not.

In Slack, in the alerts channel: `/invite @Devin`. Devin must be a member of the channel for the automation to see messages.

### Step 5 — Create the automation

*Check first:* if you can list their automations, look for one already watching the alerts channel. If there is one, review its settings against this step instead of creating another.

What we're building is Devin's **auto-triage**: **one** automation whose action is **Triage Devin (monitor)**. That action is what gives you a persistent Devin that watches the alerts channel, groups duplicates, keeps a shared scratchpad, and starts a separate investigation Devin for each actionable alert on its own. The investigations are not a second automation; the triage Devin spawns them. This is the setup from the keynote. Don't use a plain *Start session* action (that's one session per message with no memory), and don't build anything else by hand.

*Do it yourself if you can:* if you have the automation-management tool, don't send them to the UI. Read its schemas first, then create the automation: a Slack-message trigger on the alerts channel with the condition below, and the **Triage Devin** (auto-triage) action with the setup prompt below as its setup prompt. Put the Step 6 guardrails (ACU limit, invocation limit, network policy) in the same create call. Dry-run it with validate before creating; creating may need their approval, which is expected. Then show them the automation's URL and go to Step 7.

*Otherwise, in the UI:* the canonical way (per the auto-triage guide, https://docs.devin.ai/product-guides/auto-triage) is the template. In the Devin app, go to **Automations**, click *View all examples*, and choose **Triage Bug Reports** (the docs call it *Triage bug reports on Slack*). It pre-fills the editor with the Slack-message trigger and the *Triage Devin (monitor)* action. Don't use any other template, including *Investigate Alerts Triggered*, which is a plain start-session automation.

Either way, the automation needs:

1. The alerts channel as the trigger.
2. A **condition** on the message so only Datadog alert posts fire it, not people chatting in the channel. For example: message text contains the Datadog notification handle they use, like `@slack-alerts`, or the message is from the Datadog app.
3. The setup prompt below as the prompt. Fill in the service → owner → repo table with what they told you in Step 0.

```
You are the triage Devin for Datadog alerts posted in #alerts.
Investigation is handled by the child Devins you spawn; your job is to
decide what deserves one and to give it the context it needs.

Actionable vs. noise:
- Actionable: a monitor moving to Alert or Warn on a service we own, an
  error-rate or latency spike, a failed job, or a recovery that flapped
  more than once in an hour.
- Noise: a "Recovered" message on its own, a test or synthetic monitor,
  or a repeat of an alert with an open thread. For repeats, reply with a
  link to the existing thread.

Service → owner → repo (edit this):
- payments-api → @alice → org/payments
- web-frontend → @bob → org/web
- <service> → @<owner> → <repo>

What the reply in the alert's thread should include:
- What happened, in one or two sentences.
- When it started, and whether it lines up with a deploy or config
  change.
- The most likely root cause and how confident you are.
- The recommended next step.
- @mention the owner from the table above.
Keep it short. Pull only the Datadog data you need; don't dump logs into
the thread.

Code changes: do not open a PR on your own. Diagnose and reply. Only
open a PR if a human asks for one in the thread, and let them decide
the fix.

Corrections: if a human replies with a correction (wrong owner, wrong
service, known issue, not actionable), update your scratchpad so the
next alert gets it right.
```

### Step 6 — Guardrails before saving

- **ACU limit** per session, so one alert can't run away. This is the main cost control.
- **Invocation limit**: set a moderate cap, not a tiny one. The triage Devin already handles duplicates, so a very low hourly limit mostly just drops messages during an alert storm.
- **Network policy** on, since Slack messages are untrusted input.
- Confirm the automation only has Slack access to the alerts channel unless they want more.

Then save and make sure the automation is **enabled**. If you created it yourself, check these with a *get* on the automation instead of asking.

### Step 7 — Test it

1. Have them trigger the warning-level monitor from Step 1 (or temporarily lower its threshold), or post a realistic fake alert in the channel.
2. Confirm Devin replies in the thread within a few minutes. If it doesn't, check in order: Devin is in the channel (Step 4), personal Slack connection (Step 2), the automation is enabled and pointed at the right channel (Step 5), invocation history on the Automations page.
3. Read the reply together. If it tagged the wrong person or misread the alert, reply in the thread with the correction. The Triage Devin updates its scratchpad and gets it right next time.

### Step 8 — Level up (later, not today)

- Add **Knowledge** in Devin describing their services, normal thresholds, and runbooks. Investigation quality jumps.
- Route more monitors to the channel, low severity first.
- Keep the loop human-led: the investigation Devin diagnoses and replies in the thread. When someone wants a fix, they ask for a PR in the thread and decide what the fix should be.
- No Slack in the loop? Automations also have a **webhook trigger** Datadog can post to directly, and there's an API pattern at https://docs.devin.ai/use-cases/gallery/api-datadog-alert-investigation.

When everything works, summarize what was set up, where each setting lives, and how to turn it off.

## Links

- Devin auto-triage guide: https://docs.devin.ai/product-guides/auto-triage
- Devin Automations (templates, triggers, limits): https://docs.devin.ai/product-guides/automations
- Devin ↔ Datadog integration: https://docs.devin.ai/enterprise/integrations/datadog
- Datadog Slack integration: https://docs.datadoghq.com/integrations/slack/
- https://devin.ai/auto-triage
- Questions: https://x.com/imjaredz
