
import React from 'react';
import LessonLayout from '../../../components/LessonLayout';
import { getLessonBySlug } from '../../../data/curriculum';

export default function Page() {
  const lesson = getLessonBySlug('/week4/tue');
  if (!lesson) return <div>Lesson not found</div>;

  return (
    <LessonLayout lesson={lesson}>
      

  <section id="custom-cmd">
    <h2>1. 사용자 정의 명령어의 이해</h2>
    <p>
      클로드 코드의 슬래시 명령어(<code>{`/review`}</code>, <code>{`/init`}</code> 등)처럼, 나만의 슬래시 명령어를 만들 수 있습니다. 자주 반복하는 작업을 명령어로 만들면 생산성이 크게 높아집니다.
    </p>

    <h3>커스텀 명령어 저장 위치</h3>
    <ul>
      <li><strong>프로젝트 전용</strong>: <code>{`.claude/commands/명령어이름.md`}</code></li>
      <li><strong>전역(모든 프로젝트)</strong>: <code>{`~/.claude/commands/명령어이름.md`}</code></li>
    </ul>

    <h3>간단한 커스텀 명령어 만들기</h3>
    <p>파일 이름이 슬래시 명령어 이름이 됩니다. 파일 내용이 클로드 코드에게 전달되는 프롬프트입니다.</p>
    <pre><code>{`# .claude/commands/pr-desc.md 파일 생성
&gt; 이 파일을 만들어줘:
  경로: .claude/commands/pr-desc.md
  내용: 현재 git diff와 커밋 메시지를 분석해서
       GitHub PR 설명을 작성해줘.
       ## Summary (변경 요약)
       ## Why (변경 이유)
       ## Test Plan (테스트 방법)
       ## Breaking Changes (있다면)
       형식으로 작성해줘.`}</code></pre>

    <p>이제 <code>{`/pr-desc`}</code>를 입력하면 이 프롬프트가 실행됩니다:</p>
    <pre><code>{`/pr-desc`}</code></pre>

    <h3>인수(Arguments) 받는 명령어</h3>
    <p><code>{`\$ARGUMENTS`}</code> 플레이스홀더로 명령어 실행 시 인수를 받을 수 있습니다:</p>
    <pre><code>{`# .claude/commands/explain.md
다음 개념을 초보자가 이해할 수 있게 설명해줘: \$ARGUMENTS
한국어로, 실제 코드 예시와 함께 설명해줘.`}</code></pre>

    <pre><code>{`# 사용법
/explain JWT 토큰의 동작 원리
/explain async/await와 Promise의 차이점`}</code></pre>

    <h3>실전 유용한 커스텀 명령어들</h3>

    <h3>/daily-standup</h3>
    <pre><code>{`# .claude/commands/daily-standup.md
git log --since="yesterday" --author="\$(git config user.email)" --oneline 의 결과를 보고
어제 내가 한 작업을 스탠드업 미팅 형식으로 요약해줘:
- 어제 한 일:
- 오늘 할 일:
- 블로커:
한국어로 간결하게 작성해줘.`}</code></pre>

    <h3>/security-check</h3>
    <pre><code>{`# .claude/commands/security-check.md
현재 변경된 파일들을 보안 관점에서 검토해줘:
1. OWASP Top 10 취약점 확인
2. 민감한 정보 하드코딩 여부
3. 인증/인가 로직 검토
4. SQL 인젝션, XSS 가능성
각 이슈를 Critical/High/Medium/Low로 분류해줘.`}</code></pre>

    <h3>/optimize</h3>
    <pre><code>{`# .claude/commands/optimize.md
\$ARGUMENTS 파일을 성능 관점에서 분석하고 최적화해줘:
1. 시간 복잡도 개선 가능한 부분
2. 불필요한 연산이나 반복
3. 캐싱으로 이득 볼 수 있는 부분
수정 전/후 성능 차이를 설명해줘.`}</code></pre>

    <h3>/translate-to-en</h3>
    <pre><code>{`# .claude/commands/translate-to-en.md
\$ARGUMENTS 의 내용을 자연스러운 영어로 번역해줘.
기술 문서나 커밋 메시지라면 개발자 문화에 맞는 표현을 사용해줘.`}</code></pre>

    <h3>팀 공유 명령어</h3>
    <p><code>{`.claude/commands/`}</code> 폴더를 git에 커밋하면 팀 전체가 같은 명령어를 공유합니다:</p>
    <pre><code>{`git add .claude/commands/
git commit -m "feat: 팀 공유 클로드 명령어 추가"`}</code></pre>

    <h3>명령어 목록 확인</h3>
    <pre><code>{`# 사용 가능한 커스텀 명령어 확인
/help`}</code></pre>
    <p>등록된 커스텀 명령어들이 목록에 표시됩니다.</p>

    <h3>고급: Bash 명령어와 결합</h3>
    <pre><code>{`# .claude/commands/test-and-review.md
! npm test 2>&1 의 결과를 보고:
1. 실패한 테스트가 있으면 원인을 분석하고 수정해줘
2. 모두 통과하면 커버리지를 확인하고 개선이 필요한 부분을 알려줘`}</code></pre>

    <h3>Skills — 필요할 때만 로드되는 전문 지식</h3>
    <p>커스텀 명령어보다 한 단계 더 발전한 것이 <strong>Skills</strong>입니다. CLAUDE.md에 모든 것을 담기보다, 도메인별 지식을 분리해서 관련 작업을 할 때만 로드합니다:</p>
    <pre><code>{`# .claude/skills/api-design/SKILL.md
---
name: api-design
description: REST API 설계 규칙과 패턴
---
우리 팀의 API 설계 규칙:
- URL은 kebab-case, 복수형
- 응답은 항상 {"{"} data, error, meta {"}"} 구조
- 에러 코드는 도메인별로 분리 (AUTH_001, DATA_002...)
- 모든 목록 API는 cursor 기반 페이지네이션

\$ARGUMENTS에 대한 API를 위 규칙에 따라 설계해줘.`}</code></pre>
    <pre><code>{`# 사용법
/api-design 사용자 프로필 CRUD API`}</code></pre>

    <blockquote>
      커스텀 명령어는 "내가 자주 하는 작업 + 내가 자주 쓰는 프롬프트"를 결합한 것입니다. Skills는 여기서 더 나아가 "도메인 지식 + 명령어"를 결합합니다. 처음에는 간단한 명령어부터 시작해서 자신만의 명령어 라이브러리를 만들어보세요.
    </blockquote>
  </section>


    </LessonLayout>
  );
}
