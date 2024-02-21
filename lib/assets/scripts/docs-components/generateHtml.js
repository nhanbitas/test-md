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

//Title
document.title = 'Docs'

// Meta tags
addMeta('viewport', 'width=device-width, initial-scale=1.0');
addMeta('charset', 'UTF-8');

// Link stylesheets
addLinkStylesheet('../../dist/output.css');
addLinkStylesheet('../../lib/third-party/highlight.js/theme.css');

// Scripts
// Import scripts after converting markdown to html because these scripts depend on the html content
addScript("../../lib/third-party/mdConverter/md-page.js", true).onload = () => {
    // Import layout based on data
    addScript("../../lib/assets/scripts/docs-components/generateLayout.js")
    // Import highlight js
    addScript("../../lib/third-party/highlight.js/highlight.min.js")

    // Import demo code
    addScript("../../lib/assets/scripts/docs-components/demo-code.js")
    addScript("../../lib/assets/scripts/docs-components/info-pane.js")

    // Import font after highlight to generate icon. If not, the example will svg tag instead of i tag
    addScript('../../lib/third-party/font-awesome/fontawesome.min.js')
    addScript('../../lib/third-party/font-awesome/regular.js')

    // After output.js is loaded, dispatch DOMContentLoaded event for make instances
    addScript("../../dist/output.js").onload = () => {
    document.dispatchEvent(new Event('DOMContentLoaded'));
    }
}


