/* ============================== typing animation ============================ */
var typed = new Typed(".typing",{
    strings:["","Game Developer","XR Developer", "Software engineer"],
    typeSpeed:100,
    BackSpeed:60,
    loop:true
})
/* ============================== Aside ============================ */
const nav = document.querySelector(".nav"),
      navList = nav.querySelectorAll("li"),
      totalNavList = navList.length,
      allSection = document.querySelectorAll(".section"),
      totalSection = allSection.length;
      for(let i=0; i<totalNavList; i++)
      {
          const a = navList[i].querySelector("a");
          a.addEventListener("click", function()
          {
              removeBackSection();
              for(let j=0; j<totalNavList; j++)
              {
                  if(navList[j].querySelector("a").classList.contains("active"))
                  {
                      addBackSection(j);
                     // allSection[j].classList.add("back-section");
                  }
                  navList[j].querySelector("a").classList.remove("active");
              }
              this.classList.add("active")
              showSection(this);
              if(window.innerWidth < 1200)
              {
                  asideSectionTogglerBtn();
              }
          })
      }
      function removeBackSection()
      {
        for(let i=0; i<totalSection; i++)
        {
            allSection[i].classList.remove("back-section");
        }   
      }
      function addBackSection(num)
      {
        allSection[num].classList.add("back-section");
      }
      function showSection(element)
      {
          for(let i=0; i<totalSection; i++)
          {
              allSection[i].classList.remove("active");
          }
          const target = element.getAttribute("href").split("#")[1];
          document.querySelector("#" + target).classList.add("active")
      }
      function updateNav(element)
      {
          for(let i=0; i<totalNavList; i++)
          {
              navList[i].querySelector("a").classList.remove("active");
              const target = element.getAttribute("href").split("#")[1];
              if(target === navList[i].querySelector("a").getAttribute("href").split("#")[1])
              {
                navList[i].querySelector("a").classList.add("active");
              }
          }
      }
// document.querySelectorAll('.portfolio-item-inner').forEach(item => {
//     item.addEventListener('click', event => {
//         event.preventDefault();
//         // Add your custom click functionality here
//         console.log('Portfolio item clicked');
//     });
// });

document.querySelector(".hire-me").addEventListener("click", function()
      {
          const sectionIndex = this.getAttribute("data-section-index");
          //console.log(sectionIndex);
          showSection(this);
          updateNav(this);
          removeBackSection();
          addBackSection(sectionIndex);
      })
      const navTogglerBtn = document.querySelector(".nav-toggler"),
            aside = document.querySelector(".aside");
            navTogglerBtn.addEventListener("click", () => 
            {
                asideSectionTogglerBtn();
            })
            function asideSectionTogglerBtn()
            {
                aside.classList.toggle("open");
                navTogglerBtn.classList.toggle("open");
                for(let i=0; i<totalSection; i++ )
                {
                    allSection[i].classList.toggle("open");
                }
            }

           
            
            
            /* ============================== Section Scroll ============================ */

let isScrolling = false;

document.addEventListener("wheel", function (event) {

    if (isScrolling) return;

    // Don't interfere with horizontal scrolling
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;

    const activeSection = document.querySelector(".section.active");

    if (!activeSection) return;

    // Check if the current section itself has scrollable content
    const canScrollDown =
        activeSection.scrollTop + activeSection.clientHeight <
        activeSection.scrollHeight - 5;

    const canScrollUp = activeSection.scrollTop > 5;

    /*
     * If the section has internal content to scroll,
     * allow normal scrolling first.
     */
    if (event.deltaY > 0 && canScrollDown) {
        return;
    }

    if (event.deltaY < 0 && canScrollUp) {
        return;
    }

    const currentIndex = Array.from(allSection).indexOf(activeSection);

    let nextIndex = currentIndex;

    // Scroll down
    if (event.deltaY > 0 && currentIndex < totalSection - 1) {
        nextIndex++;
    }

    // Scroll up
    else if (event.deltaY < 0 && currentIndex > 0) {
        nextIndex--;
    }

    // Nothing to do
    if (nextIndex === currentIndex) return;

    const targetSection = allSection[nextIndex];

    const targetLink = nav.querySelector(
        `a[href="#${targetSection.id}"]`
    );

    if (!targetLink) return;

    // Use your existing navigation system
    targetLink.click();

    // Prevent rapid section switching
    isScrolling = true;

    setTimeout(() => {
        isScrolling = false;
    }, 700);

}, { passive: true });