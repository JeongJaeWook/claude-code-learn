
import React from 'react';
import LessonLayout from '../../../components/LessonLayout';
import { getLessonBySlug } from '../../../data/curriculum';

export default function Page() {
  const lesson = getLessonBySlug('/week1/fri');
  if (!lesson) return <div>Lesson not found</div>;

  return (
    <LessonLayout lesson={lesson}>
      

  <section id="create">
    <h2>1. 고양이가 나오는 웹 페이지 생성</h2>
    <p>
      1주차의 마지막 실습입니다. 클로드 코드로 처음부터 끝까지 웹 페이지를 만들어 인터넷에 올려봅니다. 코딩 경험이 전혀 없어도 괜찮습니다. 클로드 코드에게 원하는 것을 말하기만 하면 됩니다.
    </p>

    <h3>새 폴더 만들기</h3>
    <pre><code>{`mkdir my-cat-page
cd my-cat-page
claude`}</code></pre>

    <h3>웹 페이지 생성 요청</h3>
    <p>클로드 코드에게 이렇게 요청해보세요:</p>
    <pre><code>{`&gt; 고양이 사진이 들어간 귀여운 웹 페이지를 만들어줘.
  - 제목은 "고양이의 하루"로 해줘
  - 고양이 사진은 picsum.photos 또는 placekitten.com에서 가져와
  - 배경색은 연한 분홍색으로 하고
  - 고양이 명언 3개를 카드 형태로 보여줘
  - 반응형으로 만들어줘`}</code></pre>

    <p>클로드 코드는 <code>{`index.html`}</code>, <code>{`style.css`}</code> 파일을 만들어줄 것입니다.</p>

    <h3>결과 미리보기</h3>
    <pre><code>{`&gt; 만든 페이지를 브라우저에서 열어줘`}</code></pre>
    <p>또는 직접 파일을 더블클릭해서 브라우저에서 열어볼 수 있습니다.</p>

    <h3>요청을 계속 발전시키기</h3>
    <p>처음 결과가 마음에 들지 않으면 계속 요청을 이어가세요:</p>
    <pre><code>{`&gt; 고양이 카드에 마우스를 올리면 살짝 커지는 애니메이션을 추가해줘`}</code></pre>
    <pre><code>{`&gt; 페이지 상단에 고양이 발자국 아이콘을 추가하고, 클릭하면 야옹 소리가 나게 해줘`}</code></pre>
    <pre><code>{`&gt; 다크 모드 토글 버튼을 추가해줘`}</code></pre>

    <h3>이미지로 디자인 참조하기</h3>
    <p>마음에 드는 웹 페이지 스크린샷이 있다면 참조할 수 있습니다:</p>
    <pre><code>{`&gt; @reference-design.png 이 스크린샷과 비슷한 디자인으로 만들어줘.
  색상 톤과 카드 레이아웃을 최대한 맞춰줘`}</code></pre>

    <h3>반복적인 개선 (Iterative Refinement)</h3>
    <p>완벽한 결과를 한 번에 기대하기보다, 점진적으로 개선하는 것이 핵심입니다:</p>
    <pre><code>{`# 1단계: 기본 구조
&gt; 기본 레이아웃과 콘텐츠만 먼저 만들어줘

# 2단계: 스타일 개선
&gt; 더 모던한 느낌으로 CSS를 개선해줘. 그라디언트와 그림자 효과 추가

# 3단계: 인터랙션 추가
&gt; 카드에 hover 애니메이션과 다크모드 토글을 추가해줘

# 4단계: 반응형 확인
&gt; 모바일에서도 잘 보이는지 확인하고 반응형 수정해줘`}</code></pre>

    <blockquote>
      <strong>팁:</strong> 클로드 코드와 대화할 때 구체적일수록 좋습니다. "더 예쁘게" 보다는 "배경을 그라디언트로 바꾸고 카드에 그림자를 추가해줘"처럼 요청하세요.
      잘못된 방향으로 갔다면 <code>{`Esc`}</code> 두 번으로 되감기하여 이전 상태로 돌아갈 수 있습니다.
    </blockquote>
  </section>

  <section id="deploy">
    <h2>2. 만든 웹 페이지를 인터넷에 올리고 확인하기</h2>
    <p>
      만든 페이지를 내 컴퓨터에서만 볼 게 아니라 누구나 접근할 수 있는 인터넷에 올려봅시다. 가장 쉬운 방법은 GitHub Pages와 Netlify를 활용하는 것입니다.
    </p>

    <h3>방법 1: Netlify Drop (가장 빠름, 5초)</h3>
    <p>코딩 없이 드래그 앤 드롭으로 배포합니다:</p>
    <ol>
      <li><a href="https://app.netlify.com/drop" target="_blank" rel="noopener">app.netlify.com/drop</a>에 접속합니다</li>
      <li><code>{`my-cat-page`}</code> 폴더 전체를 브라우저 창에 드래그합니다</li>
      <li>몇 초 뒤 <code>{`https://랜덤이름.netlify.app`}</code> 주소가 생성됩니다</li>
    </ol>
    <p>끝입니다! 이 URL을 누구에게나 공유할 수 있습니다.</p>

    <h3>방법 2: GitHub Pages (무료 영구 배포)</h3>
    <p>클로드 코드에게 배포 과정을 도움받을 수 있습니다:</p>
    <pre><code>{`&gt; GitHub Pages로 이 페이지를 배포하고 싶어.
  GitHub 계정은 있는데 어떻게 하면 돼?
  git 명령어도 같이 알려줘`}</code></pre>

    <p>클로드 코드가 단계별로 안내해줄 것입니다. 대략적인 순서는:</p>
    <pre><code>{`# 1. git 초기화
git init
git add .
git commit -m "고양이 페이지 첫 배포"

# 2. GitHub에 저장소 생성 후
git remote add origin https://github.com/내아이디/my-cat-page.git
git push -u origin main`}</code></pre>
    <p>이후 GitHub 저장소 Settings → Pages → Source를 main 브랜치로 설정하면 <code>{`https://내아이디.github.io/my-cat-page`}</code>로 접속 가능합니다.</p>

    <h3>방법 3: Vercel (자동 재배포)</h3>
    <pre><code>{`&gt; Vercel CLI로 배포하고 싶어. 어떻게 해?`}</code></pre>
    <pre><code>{`# Vercel CLI 설치
npm i -g vercel

# 배포 (처음엔 로그인 과정)
vercel

# 이후 변경사항은
vercel --prod`}</code></pre>

    <h3>배포 후 확인사항</h3>
    <p>URL을 클로드 코드에 알려주면 추가 개선도 도와줍니다:</p>
    <pre><code>{`&gt; 배포된 페이지 URL: https://my-cat-page.netlify.app
  이 페이지의 SEO를 개선하고 싶어.
  meta 태그를 추가해줘`}</code></pre>

    <h3>1주차 총정리</h3>
    <blockquote>
      이번 주 배운 것들을 정리해봅시다. 설치부터 시작해 내장 명령어, 로컬 파일 분석, 디렉터리 탐색, 그리고 실제 웹 페이지 배포까지 경험했습니다. 클로드 코드는 "도구"가 아니라 내 옆에서 함께 작업하는 "파트너"에 가깝습니다. 2주차에서는 클로드 코드를 더 잘 활용하기 위한 설정 방법을 배웁니다.
    </blockquote>
  </section>


    </LessonLayout>
  );
}
