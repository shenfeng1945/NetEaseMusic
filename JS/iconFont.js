//直接拷过来，有时会加载失败
(function(window){var svgSprite="<svg>"+""+'<symbol id="icon-search" viewBox="0 0 1024 1024">'+""+'<path d="M914.912 872.736l-232.416-232.448c46.72-56.192 74.848-128.32 74.848-207.072 0-179.04-145.12-324.128-324.128-324.128-179.008 0-324.128 145.12-324.128 324.128 0 179.008 145.152 324.128 324.128 324.128 78.784 0 150.912-28.128 207.072-74.848l232.416 232.448 42.208-42.208zM143.2 433.216c0-159.904 130.08-290.016 290.016-290.016 159.904 0 290.016 130.112 290.016 290.016s-130.112 290.016-290.016 290.016c-159.936 0-290.016-130.112-290.016-290.016z"  ></path>'+""+"</symbol>"+""+'<symbol id="icon-icon2" viewBox="0 0 1024 1024">'+""+'<path d="M512 0C229.23 0 0 229.23 0 512c0 282.77 229.23 512 512 512s512-229.23 512-512C1024 229.23 794.771 0 512 0zM512 960C264.577 960 64 759.424 64 512S264.577 64 512 64s448 200.576 448 448S759.424 960 512 960z"  ></path>'+""+'<path d="M384 768 768.826 512 384 256Z"  ></path>'+""+"</symbol>"+""+'<symbol id="icon-play-copy" viewBox="0 0 1024 1024">'+""+'<path d="M950.079 513.462c0-34.546-18.602-64.75-46.349-81.186v0l-690.345-407.942c-0.245-0.153-0.521-0.276-0.767-0.445l-0.339-0.215c-14.058-8.302-30.448-13.107-47.973-13.107-52.090 0-94.293 42.205-94.293 94.293v817.203c0 52.089 42.204 94.293 94.293 94.293 17.525 0 33.916-4.789 47.973-13.107v0l0.339-0.213c0.245-0.186 0.521-0.307 0.767-0.431l690.345-407.957c27.747-16.42 46.349-46.623 46.349-81.186z"  ></path>'+""+"</symbol>"+""+'<symbol id="icon-pause" viewBox="0 0 1024 1024">'+""+'<path d="M640 960l0-896 256 0 0 896-256 0zM128 64l256 0 0 896-256 0 0-896z"  ></path>'+""+"</symbol>"+""+'<symbol id="icon-down" viewBox="0 0 1024 1024">'+""+'<path d="M153 294.6l351.5 351.5c1.9 1.9 4.5 3.1 7.5 3.1s5.6-1.2 7.6-3.2L871 294.6c13.9-13.9 36.7-13.9 50.6 0 13.9 13.9 13.9 36.7 0 50.6L537.3 729.4c-13.9 13.9-36.7 13.9-50.6 0-0.1-0.1-0.1-0.1-0.1-0.2L102.4 345.1c-13.9-13.9-13.9-36.7 0-50.6 13.9-13.8 36.7-13.8 50.6 0.1z"  ></path>'+""+'<path d="M501.8 641.2c0-0.2-0.1-0.3-0.1-0.5 0 0.2 0 0.3 0.1 0.5zM502.4 642.9c0-0.1-0.1-0.1-0.1-0.2 0 0.1 0 0.1 0.1 0.2zM501.4 638.6v0z"  ></path>'+""+"</symbol>"+""+'<symbol id="icon-up" viewBox="0 0 1024 1024">'+""+'<path d="M896 704c-8 0-16-3.2-22.4-9.6L512 332.8 150.4 694.4c-12.8 12.8-32 12.8-44.8 0-12.8-12.8-12.8-32 0-44.8l384-384c12.8-12.8 32-12.8 44.8 0l384 384c12.8 12.8 12.8 32 0 44.8-6.4 6.4-14.4 9.6-22.4 9.6z"  ></path>'+""+"</symbol>"+""+'<symbol id="icon-play" viewBox="0 0 1024 1024">'+""+'<path d="M512 985.6C250.85952 985.6 38.4 773.14048 38.4 512S250.85952 38.4 512 38.4 985.6 250.85952 985.6 512 773.14048 985.6 512 985.6M512 0C229.23264 0 0 229.23264 0 512s229.23264 512 512 512 512-229.23264 512-512S794.76736 0 512 0z m234.27072 493.93664l-366.6944-184.40192a21.7088 21.7088 0 0 0-31.41632 19.51744v365.89568a21.7088 21.7088 0 0 0 31.41632 19.53792l366.6944-184.40192a19.968 19.968 0 0 0 0-36.1472z" fill="#aaaaaa" ></path>'+""+"</symbol>"+""+'<symbol id="icon-sq" viewBox="0 0 1024 1024">'+""+'<path d="M906.196-11.039h-789.121c-62.098 0-112.375 50.556-112.375 112.922v393.746c0 62.218 50.312 112.922 112.375 112.922h789.121c62.097 0 112.375-50.556 112.375-112.922v-393.746c0.001-62.218-50.312-112.922-112.375-112.922zM962.246 495.627c0 31.333-25.135 56.595-56.050 56.595h-789.121c-30.832 0-56.050-25.363-56.050-56.595v-393.745c0-31.333 25.135-56.595 56.050-56.595h789.121c30.832 0 56.050 25.363 56.050 56.595v393.745z" fill="#fd6931" ></path>'+""+'<path d="M850.556 370.593c8.709-22.186 13.064-50.147 13.064-83.885 0-56.107-14.21-100.202-42.63-132.29-31.354-35.204-75.817-52.806-133.39-52.806-35.571 0-66.191 6.417-91.86 19.252-33.004 16.685-57.115 41.713-72.333 75.083-13.751 29.887-20.628 63.99-20.628 102.311 0 39.788 8.434 74.625 25.303 104.511 22.553 40.155 54.914 64.632 97.086 73.433 20.902 4.4 47.030 6.6 78.383 6.6 8.251 0 28.695-0.092 61.332-0.275h108.362v-47.855h-67.658c21.271-20.535 36.26-41.895 44.969-64.081zM777.536 390.395c-18.152 30.070-47.764 45.105-88.835 45.105-22.002 0-41.804-3.668-59.407-11.002-16.685-6.785-29.428-16.777-38.23-29.979-16.319-24.386-24.477-57.94-24.477-100.662 0-23.103 2.475-44.326 7.426-63.669 4.951-19.344 11.826-34.241 20.627-44.692 19.802-24.019 49.964-36.029 90.485-36.029 45.105 0.366 76.917 16.96 95.436 49.781 13.019 23.103 19.527 56.015 19.527 98.736 0.002 36.854-7.516 67.657-22.551 92.41z" fill="#fd6931" ></path>'+""+'<path d="M424.397 283.959c-10.268-7.701-23.285-13.019-39.054-15.951-15.768-2.934-39.696-4.4-71.783-4.4h-22.553c-29.337 0-50.284-4.034-62.844-12.102s-18.839-21.453-18.839-40.155c0-21.269 7.151-36.487 21.453-45.655 6.417-4.034 13.98-6.83 22.69-8.388 8.709-1.558 21.223-2.338 37.542-2.338h154.567v-47.855h-154.568c-34.837 0-61.744 3.621-80.721 10.863-18.977 7.243-34.425 19.939-46.342 38.092-12.285 18.519-18.427 39.787-18.427 63.807 0 36.488 13.385 63.166 40.155 80.034 18.702 11.918 49.689 17.877 92.96 17.877h31.353c28.787 0 47.947 1.558 57.481 4.675 21.453 6.968 32.179 25.028 32.179 54.181 0 22.919-8.251 39.146-24.753 48.681-10.818 6.234-28.695 9.351-53.63 9.351h-162.269v47.855h154.567c27.136 0 47.535-1.008 61.195-3.025 13.66-2.017 25.899-5.776 36.716-11.276 34.654-17.968 51.981-49.138 51.981-93.511 0-19.252-3.438-36.854-10.314-52.806-6.877-15.953-16.457-28.604-28.741-37.955z" fill="#fd6931" ></path>'+""+"</symbol>"+""+'<symbol id="icon-earphone" viewBox="0 0 1026 1024">'+""+'<path d="M32 0v1024"  ></path>'+""+'<path d="M64 0v1024"  ></path>'+""+'<path d="M96 0v1024"  ></path>'+""+'<path d="M128 0v1024"  ></path>'+""+'<path d="M160 0v1024"  ></path>'+""+'<path d="M192 0v1024"  ></path>'+""+'<path d="M224 0v1024"  ></path>'+""+'<path d="M256 0v1024"  ></path>'+""+'<path d="M288 0v1024"  ></path>'+""+'<path d="M320 0v1024"  ></path>'+""+'<path d="M352 0v1024"  ></path>'+""+'<path d="M384 0v1024"  ></path>'+""+'<path d="M416 0v1024"  ></path>'+""+'<path d="M448 0v1024"  ></path>'+""+'<path d="M480 0v1024"  ></path>'+""+'<path d="M512 0v1024"  ></path>'+""+'<path d="M544 0v1024"  ></path>'+""+'<path d="M576 0v1024"  ></path>'+""+'<path d="M608 0v1024"  ></path>'+""+'<path d="M640 0v1024"  ></path>'+""+'<path d="M672 0v1024"  ></path>'+""+'<path d="M704 0v1024"  ></path>'+""+'<path d="M736 0v1024"  ></path>'+""+'<path d="M768 0v1024"  ></path>'+""+'<path d="M800 0v1024"  ></path>'+""+'<path d="M832 0v1024"  ></path>'+""+'<path d="M864 0v1024"  ></path>'+""+'<path d="M896 0v1024"  ></path>'+""+'<path d="M928 0v1024"  ></path>'+""+'<path d="M960 0v1024"  ></path>'+""+'<path d="M992 0v1024"  ></path>'+""+'<path d="M1024 0v1024"  ></path>'+""+'<path d="M0 32h1026"  ></path>'+""+'<path d="M0 64h1026"  ></path>'+""+'<path d="M0 96h1026"  ></path>'+""+'<path d="M0 128h1026"  ></path>'+""+'<path d="M0 160h1026"  ></path>'+""+'<path d="M0 192h1026"  ></path>'+""+'<path d="M0 224h1026"  ></path>'+""+'<path d="M0 256h1026"  ></path>'+""+'<path d="M0 288h1026"  ></path>'+""+'<path d="M0 320h1026"  ></path>'+""+'<path d="M0 352h1026"  ></path>'+""+'<path d="M0 384h1026"  ></path>'+""+'<path d="M0 416h1026"  ></path>'+""+'<path d="M0 448h1026"  ></path>'+""+'<path d="M0 480h1026"  ></path>'+""+'<path d="M0 512h1026"  ></path>'+""+'<path d="M0 544h1026"  ></path>'+""+'<path d="M0 576h1026"  ></path>'+""+'<path d="M0 608h1026"  ></path>'+""+'<path d="M0 640h1026"  ></path>'+""+'<path d="M0 672h1026"  ></path>'+""+'<path d="M0 704h1026"  ></path>'+""+'<path d="M0 736h1026"  ></path>'+""+'<path d="M0 768h1026"  ></path>'+""+'<path d="M0 800h1026"  ></path>'+""+'<path d="M0 832h1026"  ></path>'+""+'<path d="M0 864h1026"  ></path>'+""+'<path d="M0 896h1026"  ></path>'+""+'<path d="M0 928h1026"  ></path>'+""+'<path d="M0 960h1026"  ></path>'+""+'<path d="M0 992h1026"  ></path>'+""+'<path d="M512.528 91.98c-248.528 0-450 201.472-450 450v328.726c0 33.862 27.45 61.312 61.314 61.312h106.93c33.862 0 61.314-27.452 61.314-61.312V602c0-33.862-27.452-61.312-61.312-61.312H123.844a58.908 58.908 0 0 0-21.14 4.598c1.606-3.494 1.566-6.832 1.566-10.178 0-225.476 182.786-408.262 408.262-408.262s408.264 182.786 408.264 408.262c0 2.416-0.02 4.828-0.062 7.236a36.8 36.8 0 0 1-0.146 2.716c-6.158-2.948-13.334-4.398-20.842-4.454l-105.514 0.028c-33.862 0-61.312 27.452-61.312 61.312v268.706c0 33.864 27.45 61.312 61.312 61.312h106.932c33.862 0 61.312-27.452 61.312-61.312V541.984v-0.056c0-248.498-201.448-449.944-449.944-449.944zM123.84 582.424h106.932c10.8 0 19.574 8.774 19.574 19.576v268.706c0 10.81-8.764 19.576-19.574 19.576H123.842c-10.81 0-19.576-8.764-19.576-19.576V602c0-10.8 8.776-19.576 19.576-19.576z m796.894 288.282c0 10.81-8.764 19.576-19.576 19.576h-106.932c-10.81 0-19.576-8.764-19.576-19.576V602c0-10.744 8.72-19.576 19.576-19.576h106.932c10.8 0 19.576 8.774 19.576 19.576v268.706z"  ></path>'+""+"</symbol>"+""+"</svg>";var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)