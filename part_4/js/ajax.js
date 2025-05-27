// ajax.js
export class Ajax {
    constructor() {
        this.url_api = 'https://jsonplaceholder.typicode.com/';
        this.api_key = 'e41d1f4ac632e4adf91ebf087a487ba4';
        this.ContainerLoading = null;
    }

    sendRequest(method, url_target, data) {
        var url = this.url_api + url_target;
        //var api_key = this.api_key;
        const ContainerLoading = this.ContainerLoading;
        const ShowLoading = this.ShowLoading();

        return new Promise(function(resolve, reject) {
            var http = new XMLHttpRequest();
            http.open(method, url);
            http.setRequestHeader("Cache-Control", "no-cache");
            //http.setRequestHeader("api-key", api_key);

            http.onloadstart = function() {
                if (ContainerLoading) {
                    ContainerLoading.innerHTML = '';
                    ContainerLoading.appendChild(ShowLoading);
                }
            }

            http.onload = function() {
                if (http.readyState == 4 && http.status == 200) {
                    var response = http.responseText;
                    resolve(response);
                } else {
                    reject(http.statusText);
                }
            }

            http.onerror = reject;
            http.send(data);
        });
    }

    ShowLoading() {
        var divElement = document.createElement("div");
        divElement.style.textAlign = "center";
        divElement.style.padding = "30px";
        divElement.style.height = "100%";

        var imgElement = document.createElement("img");
        imgElement.src = "images/loading.gif";

        divElement.appendChild(imgElement);

        return divElement;
    }
}
