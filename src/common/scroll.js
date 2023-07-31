const freeze = () => {
  let html = document.documentElement;
  let htmlPosition = html.style.position;
  let scrollPosition = html.scrollTop;

  if (!htmlPosition) {
    html.style.position = "fixed";
    html.style.width = "100%";
    html.style.height = "100%";
    html.style.top = "-" + scrollPosition + "px";
    html.style.overflowY = "scroll";
  }
};

const unfreeze = () => {
  let html = document.documentElement;
  let htmlPosition = html.style.position;

  if (htmlPosition === "fixed") {
    html.style.position = "static";
    html.scrollTop = -parseInt(html.style.top);
    html.style.position = "";
    html.style.top = "";
    html.style.width = "";
    html.style.height = "";
    html.style.overflowY = "";
  }
};

export { freeze, unfreeze };
