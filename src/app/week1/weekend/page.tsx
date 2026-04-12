
import React from 'react';
import LessonLayout from '../../../components/LessonLayout';
import { getLessonBySlug } from '../../../data/curriculum';

export default function Page() {
  const lesson = getLessonBySlug('/week1/weekend');
  if (!lesson) return <div>Lesson not found</div>;

  return (
    <LessonLayout lesson={lesson}>
      

  <p>AI 코딩 도구의 양대 산맥이라 불리는 클로드 코드(Anthropic)와 제미나이 CLI(Google). 둘 다 터미널에서 동작하는 AI 코딩 어시스턴트이지만, 철학과 강점이 다릅니다. 이번 주말 읽을거리에서는 두 도구를 비교해봅니다.</p>

  <h2>제미나이 CLI란?</h2>
  <p>Google이 2025년에 출시한 터미널 기반 AI 코딩 도구입니다. Gemini 2.5 Pro 모델을 기반으로 하며, Google 계정으로 무료로 사용할 수 있습니다(일일 사용량 제한 있음).</p>
  <pre><code>{`# 설치
npm install -g @google/gemini-cli

# 실행
gemini`}</code></pre>

  <h2>핵심 비교</h2>

  <h3>컨텍스트 윈도우</h3>
  <p>제미나이 CLI의 가장 강력한 무기는 <strong>100만 토큰</strong>의 거대한 컨텍스트 윈도우입니다. 대규모 모노레포나 수십만 줄짜리 레거시 코드베이스 전체를 한 번에 넣을 수 있습니다. 클로드 코드의 컨텍스트 윈도우(200K 토큰)보다 5배 크지만, 실제로 100만 토큰을 채우는 경우는 드뭅니다.</p>

  <h3>도구 통합</h3>
  <p>클로드 코드는 MCP(Model Context Protocol)를 통해 외부 도구를 연결하는 생태계가 더 성숙해 있습니다. 데이터베이스, GitHub, Slack 등 다양한 MCP 서버가 이미 존재합니다. 제미나이 CLI는 Google Workspace(Gmail, Drive, Calendar)와의 통합이 강점입니다.</p>

  <h3>코드 품질</h3>
  <p>실제 사용자들의 경험에 따르면 복잡한 리팩토링이나 아키텍처 설계에서는 Claude가, 구글 생태계(Firebase, GCP, Android)와 관련된 작업에서는 Gemini가 더 자연스러운 제안을 한다는 평가가 많습니다.</p>

  <h3>비용</h3>
  <ul>
    <li><strong>클로드 코드</strong>: Claude Pro/Max 구독($20~$200/월)에 포함. API 키 방식도 가능.</li>
    <li><strong>제미나이 CLI</strong>: Google One AI Premium($20/월)에 포함, 또는 무료 티어로 제한적 사용 가능.</li>
  </ul>

  <h2>어떤 걸 써야 할까?</h2>
  <p>둘 중 하나를 골라야 한다면:</p>
  <ul>
    <li>범용 코딩 작업, MCP 생태계, 안정적인 품질 → <strong>클로드 코드</strong></li>
    <li>Google 생태계, 거대한 코드베이스 전체 분석, 무료 시작 → <strong>제미나이 CLI</strong></li>
  </ul>

  <blockquote>
    사실 두 도구를 번갈아 쓰는 것도 좋은 전략입니다. 클로드 코드에서 설계하고, 제미나이에서 전체 코드베이스 스캔을 돌리는 식으로 각각의 강점을 살릴 수 있습니다.
  </blockquote>

  <h2>Cursor, Copilot과는 다른가?</h2>
  <p>Cursor와 GitHub Copilot은 <strong>에디터 통합형</strong> 도구입니다. IDE 안에서 작동하며 주로 코드 자동완성과 채팅에 강합니다. 반면 클로드 코드와 제미나이 CLI는 <strong>터미널 기반</strong>으로, 에디터에 종속되지 않고 파일 시스템과 시스템 명령어를 직접 실행한다는 차이가 있습니다. 에디터를 열지 않고도 대규모 리팩토링을 자율적으로 처리할 수 있는 것이 터미널형 도구의 핵심 강점입니다.</p>

  <h2>2주차 예고</h2>
  <p>다음 주부터는 클로드 코드를 더 잘 쓰기 위한 설정과 전략을 배웁니다. <code>{`CLAUDE.md`}</code>로 나만의 작업 규칙을 정의하고, 프롬프트 작성 실력을 높이고, MCP로 클로드 코드에 새로운 능력을 추가하는 방법을 익힙니다.</p>


    </LessonLayout>
  );
}
