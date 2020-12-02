function openNavNew(type) {

    var funnelDocument = document.getElementById("iframe1").contentWindow.document;
    $('.seo-form-container').hide();
    $('.email-integration-container').hide();

    if (type === 'seo') {
        $('.seo-form-container').show();
        $('#mySidebar1 .sidebar-header-area').text('SEO META DATA');

        var title = funnelDocument.querySelector('meta[name="title"]').content;
        var description = funnelDocument.querySelector('meta[name="description"]').content;
        var keywords = funnelDocument.querySelector('meta[name="keywords"]').content;
        var author = funnelDocument.querySelector('meta[name="author"]').content;

        document.getElementById("seoTitle").value = title;
        document.getElementById("seoDescription").value = description;
        document.getElementById("seoKeyword").value = keywords;
        document.getElementById("seoAuthor").value = author;

    } else if (type === 'email') {

        $('.email-integration-container').show();
        $('#mySidebar1 .sidebar-header-area').text('EMAIL INTEGRATIONS');


    }

    document.getElementById("mySidebar1").style.width = "25%";
    document.getElementById("canvas").style.width = "75%";
}

function closeNavNew() {
    document.getElementById("mySidebar1").style.width = "0";
    document.getElementById("canvas").style.width = "100%";

}