
import React from 'react';
import LessonLayout from '../../../components/LessonLayout';
import { getLessonBySlug } from '../../../data/curriculum';

export default function Page() {
  const lesson = getLessonBySlug('/week2/wed');
  if (!lesson) return <div>Lesson not found</div>;

  return (
    <LessonLayout lesson={lesson}>
      

  <section id="overview">
    <h2>1. 클로드 코드 실행 모드 개요</h2>
    <p>
      클로드 코드는 크게 세 가지 방식으로 실행할 수 있습니다. 상황에 따라 적합한 모드를 선택하면 훨씬 효율적으로 사용할 수 있습니다.
    </p>
    <ul>
      <li><strong>인터랙티브 모드</strong>: 대화하면서 작업하는 기본 모드</li>
      <li><strong>프린트 모드</strong>: 파이프라인이나 스크립트에서 사용하는 비대화형 모드</li>
      <li><strong>YOLO 모드</strong>: 모든 권한 요청을 자동 승인하는 모드</li>
    </ul>
  </section>

  <section id="interactive">
    <h2>2. 인터랙티브 모드(대화형 모드)</h2>
    <p>가장 일반적인 사용 방식입니다. 터미널에서 <code>{`claude`}</code>를 실행하면 대화형 프롬프트가 시작됩니다.</p>
    <pre><code>{`claude                    # 현재 디렉터리에서 시작
claude --resume           # 이전 대화 이어하기
claude "질문 내용"         # 시작 메시지와 함께 실행`}</code></pre>

    <h3>세션 지속성</h3>
    <p>인터랙티브 모드에서는 대화가 이어지면서 이전 작업의 맥락을 유지합니다. 단, 세션을 종료(<code>{`/exit`}</code>)하면 다음 실행 시에는 새로운 대화로 시작됩니다.</p>

    <h3>--resume 플래그</h3>
    <p>이전 세션의 마지막 대화 상태를 불러옵니다. 작업 중에 터미널을 실수로 닫았을 때 유용합니다.</p>
    <pre><code>{`claude --resume`}</code></pre>
  </section>

  <section id="print">
    <h2>3. 프린트 모드(비대화형 모드)</h2>
    <p>
      <code>{`-p`}</code> 플래그(또는 <code>{`--print`}</code>)를 사용하면 단일 질문에 대한 답을 받고 바로 종료합니다. 셸 스크립트나 CI/CD 파이프라인에서 활용할 수 있습니다.
    </p>
    <pre><code>{`# 기본 사용
claude -p "이 프로젝트의 README를 작성해줘"

# 출력을 파일로 저장
claude -p "package.json을 분석해서 보안 취약점 목록을 JSON으로 줘" > report.json

# 파이프로 입력 받기
cat error.log | claude -p "이 에러 로그를 분석해줘"

# git diff와 결합
git diff | claude -p "이 변경사항을 한국어 커밋 메시지로 작성해줘"`}</code></pre>

    <h3>활용 예시: 자동화 스크립트</h3>
    <pre><code>{`#!/bin/bash
# 매일 아침 TODO 파일을 분석해서 오늘 할 일 정리
claude -p "\$(cat TODO.md) 위 내용에서 오늘 처리해야 할 긴급 항목만 뽑아줘"`}</code></pre>
  </section>

  <section id="yolo">
    <h2>4. YOLO 모드(권한 스킵 옵션)</h2>
    <p>
      기본적으로 클로드 코드는 파일을 쓰거나 명령어를 실행하기 전에 승인을 요청합니다. 이 승인 과정을 줄이는 방법은 세 가지입니다.
    </p>

    <h3>방법 1: Auto 모드 (권장)</h3>
    <p>별도의 분류기 모델이 명령어를 검토하고, 위험해 보이는 것만 차단합니다. 대부분의 일상적인 작업은 자동 승인됩니다.</p>
    <pre><code>{`claude --permission-mode auto
# 또는 프린트 모드에서
claude --permission-mode auto -p "모든 린트 에러 수정해줘"`}</code></pre>

    <h3>방법 2: 권한 허용 목록</h3>
    <p><code>{`/permissions`}</code> 명령어로 특정 도구나 명령어를 미리 허용합니다:</p>
    <pre><code>{`/permissions
# 예: npm run lint, npm test, git commit 등을 자동 승인 목록에 추가`}</code></pre>

    <h3>방법 3: 샌드박스 모드</h3>
    <p>OS 수준의 격리를 활성화해서 파일시스템과 네트워크 접근을 제한합니다:</p>
    <pre><code>{`/sandbox`}</code></pre>

    <h3>방법 4: --dangerously-skip-permissions</h3>
    <p>모든 권한 요청을 자동 승인합니다. <strong>가장 위험한 옵션</strong>입니다.</p>
    <pre><code>{`claude --dangerously-skip-permissions`}</code></pre>
    <blockquote>
      <strong>주의:</strong> 이 모드는 클로드 코드가 확인 없이 파일을 삭제하거나 수정할 수 있습니다. 반드시 git 저장소에서만, 테스트 환경에서만 사용하세요. 실무에서는 Auto 모드를 권장합니다.
    </blockquote>
  </section>

  <section id="keys">
    <h2>5. 인터랙티브 모드의 특수 키 기능</h2>

    <h3>입력 관련</h3>
    <ul>
      <li><strong>Enter</strong>: 메시지 전송</li>
      <li><strong>Shift+Enter</strong>: 줄 바꿈 (메시지 내에서 여러 줄 입력)</li>
      <li><strong>Escape</strong>: 현재 입력 취소 또는 멀티라인 모드 종료</li>
      <li><strong>↑ / ↓</strong>: 이전/다음 입력 히스토리 탐색</li>
      <li><strong>Tab</strong>: 슬래시 명령어나 @파일 경로 자동완성</li>
    </ul>

    <h3>실행 중 제어</h3>
    <ul>
      <li><strong>Ctrl+C</strong>: 클로드 코드의 현재 작업 중단 (처리 중인 도구 실행 취소)</li>
      <li><strong>Ctrl+C (두 번)</strong>: 클로드 코드 완전 종료</li>
    </ul>

    <h3>Vim 키바인딩</h3>
    <p>Vim 사용자라면 설정에서 Vim 모드를 활성화할 수 있습니다:</p>
    <pre><code>{`# ~/.claude/settings.json
&#123;
  "keybindings": "vim"
&#125;`}</code></pre>
  </section>

  <section id="detail">
    <h2>6. 모드별 상세 설명</h2>

    <h3>--model 플래그</h3>
    <p>실행 시 모델을 직접 지정할 수 있습니다:</p>
    <pre><code>{`claude --model claude-opus-4-5       # 최고 성능
claude --model claude-haiku-4-5      # 최고 속도`}</code></pre>

    <h3>--add-dir 플래그</h3>
    <p>현재 디렉터리 외에 추가 디렉터리를 컨텍스트에 포함시킵니다:</p>
    <pre><code>{`claude --add-dir ../shared-library   # 공유 라이브러리도 함께 참조`}</code></pre>

    <h3>--output-format 플래그 (프린트 모드)</h3>
    <pre><code>{`claude -p "분석해줘" --output-format json   # JSON 형태로 출력
claude -p "분석해줘" --output-format text   # 일반 텍스트 (기본값)`}</code></pre>
  </section>

  <section id="scenario">
    <h2>7. 모드별 사용 시나리오</h2>

    <h3>시나리오 1: 일상적인 코딩 작업</h3>
    <p>→ <strong>인터랙티브 모드</strong>. 대화하면서 맥락을 쌓아가는 작업에 가장 적합합니다.</p>

    <h3>시나리오 2: 커밋 메시지 자동 생성</h3>
    <p>→ <strong>프린트 모드</strong>. git hook에 등록해서 자동화할 수 있습니다.</p>
    <pre><code>{`# .git/hooks/prepare-commit-msg
#!/bin/bash
COMMIT_MSG_FILE=\$1
DIFF=\$(git diff --cached)
if [ -n "\$DIFF" ]; then
  MSG=\$(echo "\$DIFF" | claude -p "이 diff를 보고 Conventional Commits 형식의 커밋 메시지를 작성해줘. 메시지만 출력해.")
  echo "\$MSG" > "\$COMMIT_MSG_FILE"
fi`}</code></pre>

    <h3>시나리오 3: 대규모 마이그레이션</h3>
    <p>→ <strong>YOLO 모드 (git 저장소 필수)</strong>. 수백 개 파일의 API 경로를 바꾸는 작업 등.</p>
  </section>

  <section id="tips">
    <h2>8. 문제 해결 및 팁</h2>

    <h3>프린트 모드에서 응답이 너무 길면</h3>
    <pre><code>{`claude -p "요약해서 3줄로만 알려줘: \$(cat report.txt)"`}</code></pre>

    <h3>대화 기록 저장</h3>
    <pre><code>{`# 터미널 출력 전체를 파일로 저장
claude | tee session.log`}</code></pre>

    <h3>여러 파일을 순서대로 처리</h3>
    <pre><code>{`for file in src/**/*.js; do
  claude -p "이 파일을 TypeScript로 변환해줘: \$(cat \$file)" > "\$&#123;file%.js&#125;.ts"
done`}</code></pre>
  </section>


    </LessonLayout>
  );
}
