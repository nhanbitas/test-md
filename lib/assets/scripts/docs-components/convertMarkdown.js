const convertMarkdownToHtml = async (markdownFile) => {
    const response = await fetch(markdownFile);
    const text = await response.text();
    const converter = new showdown.Converter();
    const html = converter.makeHtml(text);
    return html;
  };
  
  const main = async () => {
    const component = getParam() || "introduction";
  
    //thêm try catch convertMarkdownToHtml để xử lý khi không tìm được file md,và trả về trang mặt định thay vì  if else
    if (component === "introduction") {
      const started = document.getElementById("info");
      const startedMarkdownHtml = await convertMarkdownToHtml(`./info.md`)
      started.innerHTML = startedMarkdownHtml;
      document.querySelector('#tabs').remove();
    } else {
      const started = document.getElementById("info");
      const startedMarkdownHtml = await convertMarkdownToHtml(`./info.md`)
      started.innerHTML = startedMarkdownHtml;
  
      const variants = document.getElementById("variants");
      const variantsMarkdownHtml = await convertMarkdownToHtml(`./variants.md`)
      variants.innerHTML = variantsMarkdownHtml;
    
      const usage = document.getElementById("usage");
      const usageMarkdownHtml = await convertMarkdownToHtml(`./usage.md`)
      usage.innerHTML = usageMarkdownHtml;
    
      const dev = document.getElementById("dev");
      const devMarkdownHtml = await convertMarkdownToHtml(`./dev.md`)
      dev.innerHTML = devMarkdownHtml;
    }
  
    // add needed scripts after converting
    // these scripts can not import by script because convert is async function
    addScript("../../lib/assets/scripts/docs-components/demo-code.js")
    addScript("../../lib/assets/scripts/docs-components/info-pane.js")
    addScript("../../dist/output.js").onload = () => {
      document.dispatchEvent(new Event('DOMContentLoaded'));
    }
  
  } 
  
  const getParam = () => {
    const url = window.location.href;
    const pathArray = url.split('/'); // Tách chuỗi theo dấu "/"
    const gettingStarted = pathArray[pathArray.length - 2]; // Lấy phần tử thứ hai từ cuối
    return gettingStarted
  }
  
  const addScript = (src) => {
    var scriptElement = document.createElement('script');
    scriptElement.src = src;
    document.head.appendChild(scriptElement);
    return scriptElement
  }
  
  main()