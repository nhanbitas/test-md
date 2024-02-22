const addMeta = (name, content) => {
    const meta = document.createElement('meta');
    meta.setAttribute('name', name);
    meta.setAttribute('content', content);
    document.head.appendChild(meta);
    return meta
}

const addLinkStylesheet = (href) => {
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', href);
    document.head.appendChild(link);
    return link
}

const addScript = (src, defer=false) => {
    const script = document.createElement('script');
    script.setAttribute('src', src);
    defer && script.setAttribute('defer', '');
    document.head.appendChild(script);
    return script
}

const addScriptAsync = (src, defer=false) => {
    return new Promise((resolve, reject) => {
        const script =addScript(src, defer);
        script.async = true; 
        script.onload = resolve; 
        script.onerror = reject; 
    });
};

//Title
document.title = 'Docs'

// Meta tags
addMeta('viewport', 'width=device-width, initial-scale=1.0');
addMeta('charset', 'UTF-8');

// Link stylesheets
addLinkStylesheet('../../dist/output.css');
addLinkStylesheet('../../src/third-party/highlight.js/theme.css');
addLinkStylesheet('../../src/assets/styles/docs-styles/index.css');

// Scripts
// Import scripts after converting markdown to html because these scripts depend on the html content

// Because of needed html to run all scripts, we need async script handler
const addDocScript = async () => {
    // Convert markdown to html
    await addScriptAsync("../../src/third-party/mdConverter/md-page.js", true)
    // Import layout based on data
    await addScriptAsync("../../src/assets/scripts/docs-components/generateLayout.js")

    // Import highlight js
    addScript("../../src/third-party/highlight.js/highlight.min.js")
    
    // Import demo code
    addScript("../../src/assets/scripts/docs-components/demo-code.js")
    addScript("../../src/assets/scripts/docs-components/info-pane.js")

    // Import font after highlight to generate icon. If not, the example will svg tag instead of i tag
    addScript('../../src/third-party/font-awesome/fontawesome.min.js')
    addScript('../../src/third-party/font-awesome/regular.js')

    // After output.js is loaded, dispatch DOMContentLoaded event for make instances
    addScript("../../dist/output.js").onload = () => {
    document.dispatchEvent(new Event('DOMContentLoaded'));
    }
}

addDocScript()  



