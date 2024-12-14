window.addEventListener("scroll", setScrollVar)
window.addEventListener("resize", setScrollVar)

function setScrollVar() {
    const htmlElement = document.documentElement
    const percentOfScreenHeightScrolled =
      htmlElement.scrollTop / htmlElement.clientHeight
    const cropAmt = Math.min(percentOfScreenHeightScrolled * 100, 35)
    console.log(cropAmt)
    htmlElement.style.setProperty(
      "--scroll",
      cropAmt
    )
    document.querySelector(".landingBgd").style.borderRadius = cropAmt + "%";
    }
