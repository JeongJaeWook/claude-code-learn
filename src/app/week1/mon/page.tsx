
import React from 'react';
import LessonLayout from '../../../components/LessonLayout';
import { getLessonBySlug } from '../../../data/curriculum';

export default function Page() {
  const lesson = getLessonBySlug('/week1/mon');
  if (!lesson) return <div>Lesson not found</div>;

  return (
    <LessonLayout lesson={lesson}>
      
  <section id="install">
    <h2>1. 클로드 코드 설치</h2>
    <p>
      클로드 코드(Claude Code)는 Anthropic이 만든 <strong>에이전틱 코딩 환경</strong>입니다.
      일반 챗봇과 다르게, 파일을 읽고, 명령어를 실행하고, 코드를 수정하고, 문제를 자율적으로 해결합니다.
      터미널 CLI, 데스크톱 앱, VS Code/JetBrains 확장, 웹 앱 등 다양한 방식으로 사용할 수 있습니다.
    </p>

    <h3>사전 요구사항</h3>
    <ul>
      <li><strong>계정</strong>: Claude Pro/Max 구독($20~$200/월), Claude Console API 키, 또는 AWS Bedrock/Google Vertex/Azure Foundry 중 하나</li>
      <li><strong>운영체제</strong>: macOS, Linux, Windows(WSL 포함) 모두 지원</li>
      <li><strong>Windows 사용자</strong>: <a href="https://git-scm.com/downloads/win" target="_blank" rel="noopener">Git for Windows</a>가 필요합니다</li>
    </ul>

    <h3>설치 방법 1: 네이티브 설치 (권장)</h3>
    <p>터미널을 열고 운영체제에 맞는 명령어를 실행합니다. 자동 업데이트를 지원하므로 항상 최신 버전을 유지합니다.</p>
    <pre><code>{`# macOS / Linux
curl -fsSL https://claude.ai/install.sh | bash

# Windows PowerShell
irm https://claude.ai/install.ps1 | iex

# Windows CMD
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd`}</code></pre>

    <h3>설치 방법 2: Homebrew (macOS)</h3>
    <pre><code>{`brew install --cask claude-code

# 업데이트 (자동 업데이트 미지원, 수동으로 실행)
brew upgrade claude-code`}</code></pre>

    <h3>설치 방법 3: WinGet (Windows)</h3>
    <pre><code>{`winget install Anthropic.ClaudeCode

# 업데이트
winget upgrade Anthropic.ClaudeCode`}</code></pre>

    <h3>설치 확인</h3>
    <p>설치가 완료되면 버전을 확인합니다:</p>
    <pre><code>{`claude --version`}</code></pre>

    <h3>다른 사용 방법</h3>
    <p>터미널 CLI 외에도 다양한 환경에서 사용할 수 있습니다:</p>
    <ul>
      <li><strong>데스크톱 앱</strong>: <a href="https://claude.com/download" target="_blank" rel="noopener">claude.com/download</a>에서 Mac/Windows 앱 다운로드</li>
      <li><strong>VS Code</strong>: Extensions에서 "Claude Code" 검색 후 설치 (<code>{`code --install-extension anthropic.claude-code`}</code>)</li>
      <li><strong>JetBrains IDE</strong>: JetBrains Marketplace에서 "Claude Code" 플러그인 설치</li>
      <li><strong>웹</strong>: <a href="https://claude.ai/code" target="_blank" rel="noopener">claude.ai/code</a>에서 브라우저로 바로 사용</li>
    </ul>

    <blockquote>
      이 커리큘럼에서는 터미널 CLI를 기준으로 설명하지만, 데스크톱 앱이나 VS Code 확장도 동일한 기능을 제공합니다.
      자신에게 편한 환경을 선택하세요.
    </blockquote>
  </section>

  <section id="run">
    <h2>2. 클로드 코드 실행</h2>
    <p>
      설치 후 처음 실행하면 계정 인증을 진행합니다. 한 번 로그인하면 자격 증명이 저장되어 다시 로그인할 필요가 없습니다.
    </p>

    <h3>계정 유형별 로그인</h3>
    <ul>
      <li><strong>Claude Pro/Max 구독 (권장)</strong>: 브라우저가 열리면서 Claude.ai 계정으로 인증. 별도 API 요금 없이 구독에 포함된 사용량으로 사용.</li>
      <li><strong>Claude Console (API 키)</strong>: <a href="https://console.anthropic.com" target="_blank" rel="noopener">console.anthropic.com</a>에서 선불 크레딧을 충전하고 API 키로 인증. 사용량에 따라 과금.</li>
      <li><strong>클라우드 제공자</strong>: Amazon Bedrock, Google Vertex AI, Microsoft Foundry를 통해 기업용으로 사용.</li>
    </ul>

    <h3>처음 실행하기</h3>
    <pre><code>{`# 프로젝트 디렉터리에서 실행 (권장)
cd my-project
claude

# 시작 메시지와 함께 실행
claude "이 프로젝트의 구조를 설명해줘"

# 이전 대화 이어하기
claude --continue    # 가장 최근 대화
claude --resume      # 대화 목록에서 선택`}</code></pre>

    <p>클로드 코드는 현재 디렉터리의 파일들을 자동으로 인식합니다. <strong>프로젝트 루트에서 실행하는 것</strong>이 가장 좋습니다.</p>

    <h3>환영 화면 살펴보기</h3>
    <p>처음 실행하면 세션 정보, 사용 가능한 모델, 최신 업데이트가 포함된 환영 화면이 표시됩니다. 유용한 시작 명령어들:</p>
    <pre><code>{`/help      # 사용 가능한 모든 명령어 보기
/model     # 현재 모델 확인 및 변경
/status    # 연결 상태 확인`}</code></pre>

    <h3>첫 번째 대화: 프로젝트 탐색</h3>
    <p>실행 후 프롬프트가 나타나면 프로젝트를 탐색해봅시다:</p>
    <pre><code>{`&gt; 이 프로젝트는 무엇을 하나요?
&gt; 어떤 기술 스택을 사용하나요?
&gt; 주요 진입점은 어디인가요?
&gt; 폴더 구조를 설명해주세요`}</code></pre>

    <p>클로드 코드는 필요에 따라 파일을 자동으로 읽고 분석합니다. 수동으로 파일을 지정할 필요가 없습니다.</p>

    <h3>첫 번째 코드 변경</h3>
    <p>간단한 수정을 시도해보세요:</p>
    <pre><code>{`&gt; 주 파일에 hello world 함수를 추가해줘`}</code></pre>
    <p>클로드 코드는 적절한 파일을 찾고, 변경 사항을 보여주고, 승인을 요청합니다. 개별 변경 사항을 하나씩 승인하거나 거부할 수 있습니다.</p>

    <h3>Git과 함께 사용하기</h3>
    <p>클로드 코드는 Git 작업도 자연어로 처리합니다:</p>
    <pre><code>{`&gt; 어떤 파일을 변경했나요?
&gt; 설명적인 메시지로 변경 사항을 커밋해줘
&gt; feature/hello-world라는 새 브랜치 만들어줘`}</code></pre>

    <h3>필수 키보드 단축키</h3>
    <ul>
      <li><strong>Enter</strong>: 메시지 전송</li>
      <li><strong>Shift+Enter</strong>: 줄 바꿈 (여러 줄 입력)</li>
      <li><strong>Esc</strong>: 현재 작업 중단 (맥락은 유지됨)</li>
      <li><strong>Esc × 2</strong>: 되감기 메뉴 열기 (이전 상태로 복원)</li>
      <li><strong>↑ / ↓</strong>: 이전 입력 탐색</li>
      <li><strong>Tab</strong>: 자동완성</li>
      <li><strong>?</strong>: 모든 키보드 단축키 보기</li>
    </ul>

    <blockquote>
      <strong>실습:</strong> 아무 프로젝트 폴더에서 <code>{`claude`}</code>를 실행하고 "이 프로젝트의 폴더 구조를 설명해줘"라고 입력해보세요.
      프로젝트가 없다면 빈 폴더를 만들고 "간단한 Hello World 웹 페이지를 만들어줘"라고 요청해보세요.
    </blockquote>
  </section>

    </LessonLayout>
  );
}
