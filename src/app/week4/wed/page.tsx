
import React from 'react';
import LessonLayout from '../../../components/LessonLayout';
import { getLessonBySlug } from '../../../data/curriculum';

export default function Page() {
  const lesson = getLessonBySlug('/week4/wed');
  if (!lesson) return <div>Lesson not found</div>;

  return (
    <LessonLayout lesson={lesson}>
      

  <section id="hooks">
    <h2>1. Hooks 시스템 이해하기</h2>
    <p>
      Hooks는 클로드 코드의 특정 시점에서 자동으로 실행되는 사용자 정의 핸들러입니다.
      CLAUDE.md의 지시는 무시될 수 있지만, <strong>Hooks는 물리적으로 도구 실행을 차단하거나 강제할 수 있습니다</strong>.
      Git의 pre-commit 훅과 유사한 개념입니다.
    </p>

    <h3>CLAUDE.md vs Hooks</h3>
    <ul>
      <li><strong>CLAUDE.md</strong>: "이렇게 해줘"라는 <em>권고</em>. 무시될 수 있음</li>
      <li><strong>Hooks</strong>: "이것은 반드시 실행된다"는 <em>보장</em>. 린팅, 포맷팅, 보안 검사 등 예외 없이 실행해야 하는 것에 사용</li>
    </ul>

    <h3>4가지 Hook 타입</h3>
    <ul>
      <li><strong>Command</strong>: 셸 명령어 실행 (가장 일반적)</li>
      <li><strong>HTTP</strong>: 외부 서버에 POST 요청 (웹훅, 조직 수준 검증)</li>
      <li><strong>Prompt</strong>: LLM에게 단일 턴 평가 요청 (30초 타임아웃)</li>
      <li><strong>Agent</strong>: 도구 사용 가능한 서브에이전트 실행 (복잡한 검증)</li>
    </ul>

    <h3>Hook 설정 위치</h3>
    <pre><code>{`~/.claude/settings.json              # 모든 프로젝트 (전역)
.claude/settings.json                # 이 프로젝트 (팀 공유 가능)
.claude/settings.local.json          # 이 프로젝트 (개인용)`}</code></pre>

    <h3>주요 이벤트와 발생 빈도</h3>
    <pre><code>{`# 세션당 1회
SessionStart    — 세션 시작/재개 시
SessionEnd      — 세션 종료 시

# 턴당 1회
UserPromptSubmit — 사용자 프롬프트 제출 시
Stop            — Claude 응답 완료 시

# 도구 호출마다
PreToolUse      — 도구 실행 직전 (차단 가능!)
PostToolUse     — 도구 실행 직후 (검증 가능!)

# 기타
FileChanged     — 감시 중인 파일 변경 시
PreCompact      — 컨텍스트 압축 전`}</code></pre>

    <h3>Exit Code의 의미</h3>
    <p>Hook 스크립트의 exit code가 동작을 결정합니다:</p>
    <ul>
      <li><strong>Exit 0</strong>: 통과 (정상 진행)</li>
      <li><strong>Exit 1</strong>: 비차단 오류 (경고만 표시, 진행은 계속)</li>
      <li><strong>Exit 2</strong>: <strong>차단!</strong> 해당 도구 실행을 물리적으로 막음</li>
    </ul>

    <h3>기본 설정 구조</h3>
    <pre><code>{`{"{"}
  "hooks": {"{"}
    "이벤트명": [
      {"{"}
        "matcher": "매칭 패턴",
        "hooks": [
          {"{"}
            "type": "command",
            "command": "실행할 셸 명령어",
            "timeout": 30
          {"}"}
        ]
      {"}"}
    ]
  {"}"}
{"}"}`}</code></pre>

    <h3>Matcher 패턴</h3>
    <ul>
      <li><code>{`"*"`}</code> 또는 생략: 모든 도구에 매칭</li>
      <li><code>{`"Bash"`}</code>: Bash 도구에만 매칭</li>
      <li><code>{`"Edit|Write"`}</code>: Edit 또는 Write 도구에 매칭</li>
      <li><code>{`"mcp__.*"`}</code>: 정규식으로 모든 MCP 도구에 매칭</li>
    </ul>

    <h3>실전 예시 1: 파일 수정 후 자동 포맷팅</h3>
    <pre><code>{`{"{"}
  "hooks": {"{"}
    "PostToolUse": [
      {"{"}
        "matcher": "Edit|Write",
        "hooks": [
          {"{"}
            "type": "command",
            "command": "\"\$CLAUDE_PROJECT_DIR\"/.claude/hooks/auto-format.sh",
            "timeout": 30
          {"}"}
        ]
      {"}"}
    ]
  {"}"}
{"}"}`}</code></pre>
    <pre><code>{`# .claude/hooks/auto-format.sh
#!/bin/bash
FILE=\$(cat /dev/stdin | jq -r '.tool_input.file_path // empty')
if [[ "\$FILE" == *.py ]]; then
  ruff format "\$FILE" 2>/dev/null
elif [[ "\$FILE" == *.ts ]] || [[ "\$FILE" == *.tsx ]]; then
  npx prettier --write "\$FILE" 2>/dev/null
fi
exit 0`}</code></pre>

    <h3>실전 예시 2: 위험 명령어 차단</h3>
    <pre><code>{`{"{"}
  "hooks": {"{"}
    "PreToolUse": [
      {"{"}
        "matcher": "Bash",
        "hooks": [
          {"{"}
            "type": "command",
            "command": "\"\$CLAUDE_PROJECT_DIR\"/.claude/hooks/block-dangerous.sh"
          {"}"}
        ]
      {"}"}
    ]
  {"}"}
{"}"}`}</code></pre>
    <pre><code>{`# .claude/hooks/block-dangerous.sh
#!/bin/bash
COMMAND=\$(cat /dev/stdin | jq -r '.tool_input.command // empty')

if echo "\$COMMAND" | grep -qE 'rm -rf|DROP TABLE|DROP DATABASE'; then
  echo "위험한 명령어가 차단되었습니다: \$COMMAND" >&2
  exit 2  # Exit 2 = 차단!
fi
exit 0`}</code></pre>

    <h3>실전 예시 3: 작업 완료 알림 (macOS)</h3>
    <pre><code>{`{"{"}
  "hooks": {"{"}
    "Stop": [
      {"{"}
        "hooks": [
          {"{"}
            "type": "command",
            "command": "osascript -e 'display notification \"클로드 코드 작업 완료\" with title \"Claude Code\"'"
          {"}"}
        ]
      {"}"}
    ]
  {"}"}
{"}"}`}</code></pre>

    <h3>실전 예시 4: Stop Hook으로 자동 테스트 실행</h3>
    <pre><code>{`{"{"}
  "hooks": {"{"}
    "Stop": [
      {"{"}
        "hooks": [
          {"{"}
            "type": "agent",
            "prompt": "방금 수정한 파일과 관련된 테스트를 실행하고, 실패하면 수정해줘"
          {"}"}
        ]
      {"}"}
    ]
  {"}"}
{"}"}`}</code></pre>
    <p>Agent 타입 Hook은 서브에이전트를 실행해서 복잡한 검증을 수행할 수 있습니다.</p>

    <h3>실전 예시 5: SessionStart에서 환경 설정</h3>
    <pre><code>{`{"{"}
  "hooks": {"{"}
    "SessionStart": [
      {"{"}
        "matcher": "startup",
        "hooks": [
          {"{"}
            "type": "command",
            "command": "\"\$CLAUDE_PROJECT_DIR\"/.claude/hooks/setup-env.sh"
          {"}"}
        ]
      {"}"}
    ]
  {"}"}
{"}"}`}</code></pre>
    <pre><code>{`# .claude/hooks/setup-env.sh
#!/bin/bash
if [ -n "\$CLAUDE_ENV_FILE" ]; then
  echo 'export NODE_ENV=development' >> "\$CLAUDE_ENV_FILE"
  echo 'export PATH="\$PATH:./node_modules/.bin"' >> "\$CLAUDE_ENV_FILE"
fi
exit 0`}</code></pre>

    <h3>클로드에게 Hook 만들어달라고 하기</h3>
    <p>Hook 설정이 복잡하다면 클로드 코드에게 직접 만들어달라고 요청하세요:</p>
    <pre><code>{`&gt; 파일을 수정할 때마다 ESLint를 자동 실행하는 Hook을 만들어줘
&gt; migrations 폴더에 쓰기를 차단하는 Hook을 만들어줘
&gt; 작업 완료 시 Slack 알림을 보내는 Hook을 만들어줘`}</code></pre>

    <h3>Hook 확인 및 디버깅</h3>
    <pre><code>{`/hooks    # 현재 설정된 모든 Hook 브라우징`}</code></pre>

    <blockquote>
      <strong>핵심 원칙:</strong> CLAUDE.md에 쓸지, Hook으로 만들지 고민될 때 — "이것이 100% 실행되어야 하는가?"를 기준으로 판단하세요.
      린팅, 포맷팅, 보안 검사처럼 예외 없이 실행해야 하는 것은 Hook으로, 코딩 스타일 가이드 같은 것은 CLAUDE.md로 관리하세요.
    </blockquote>
  </section>

  <section id="output-style">
    <h2>2. Output Style로 응답 방식 바꾸기</h2>
    <p>
      클로드 코드의 동작과 응답 스타일을 <code>{`.claude/settings.json`}</code>으로 세밀하게 제어할 수 있습니다.
    </p>

    <h3>settings.json 주요 설정</h3>
    <pre><code>{`{"{"}
  "model": "claude-sonnet-4-6",     // 기본 모델
  "permissions": {"{"}               // 자동 승인 규칙
    "allow": [
      "Bash(npm test *)",
      "Bash(git commit *)",
      "Edit"
    ]
  {"}"},
  "hooks": {"{"} ... {"}"}
{"}"}`}</code></pre>

    <h3>CLAUDE.md로 응답 스타일 지정</h3>
    <pre><code>{`## 응답 스타일 지침
- 답변은 한국어로
- 코드 변경 시 변경 이유를 먼저 설명
- 긴 설명보다 코드 예시를 우선
- 한 번에 한 가지 변경만 제안
- 작업 완료 후 다음 단계를 항상 제안`}</code></pre>

    <h3>Status Line 커스터마이징</h3>
    <p>터미널 하단에 표시되는 상태 표시줄을 커스터마이징해서 컨텍스트 사용량, 비용, git 브랜치 등을 실시간 확인할 수 있습니다.</p>

    <h3>프로젝트별 설정 분리</h3>
    <pre><code>{`# 프로덕션 프로젝트: Opus로 신중하게
# .claude/settings.json
{"{"}
  "model": "claude-opus-4-6"
{"}"}

# 실험 프로젝트: Haiku로 빠르게
# .claude/settings.json
{"{"}
  "model": "claude-haiku-4-5"
{"}"}`}</code></pre>

    <h3>Skills — 필요할 때만 로드되는 전문 지식</h3>
    <p>CLAUDE.md에 모든 것을 넣기보다, 도메인별 지식은 Skills로 분리하면 컨텍스트를 효율적으로 사용합니다:</p>
    <pre><code>{`# .claude/skills/fix-issue/SKILL.md
---
name: fix-issue
description: GitHub 이슈를 분석하고 수정합니다
disable-model-invocation: true
---
GitHub 이슈를 분석하고 수정합니다: \$ARGUMENTS

1. \`gh issue view\`로 이슈 상세 확인
2. 관련 코드 검색
3. 수정 구현
4. 테스트 작성 및 실행
5. 커밋 메시지 작성
6. PR 생성`}</code></pre>
    <p>사용법: <code>{`/fix-issue 42`}</code></p>

    <h3>Custom Subagent — 전문 어시스턴트</h3>
    <p><code>{`.claude/agents/`}</code>에 전문 서브에이전트를 정의할 수 있습니다:</p>
    <pre><code>{`# .claude/agents/security-reviewer.md
---
name: security-reviewer
description: 보안 취약점 전문 리뷰어
tools: Read, Grep, Glob, Bash
model: opus
---
시니어 보안 엔지니어로서 코드를 검토합니다:
- 인젝션 취약점 (SQL, XSS, Command injection)
- 인증/인가 결함
- 하드코딩된 시크릿
- 안전하지 않은 데이터 처리

구체적인 줄 번호와 수정 제안을 포함합니다.`}</code></pre>
    <p>사용법: <code>{`보안 리뷰 서브에이전트를 사용해서 이 코드를 검토해줘`}</code></p>

    <blockquote>
      Hooks, Skills, Subagents, Settings를 조합하면 클로드 코드를 완전히 나만의 개발 환경으로 만들 수 있습니다.
      처음에는 간단한 것부터 시작하고, 점차 필요에 따라 확장하세요.
    </blockquote>
  </section>


    </LessonLayout>
  );
}
