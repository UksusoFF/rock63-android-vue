export function injectVKOpenApi() {
  return new Promise((resolve, reject) => {
    try {
      const fjs = document.getElementsByTagName("script")[0];

      if (document.getElementById("vk_openapi_js")) {
        resolve();
        return;
      }

      const js = document.createElement("script");

      js.id = "vk_openapi_js";
      js.src = "https://vk.com/js/api/openapi.js?168";
      js.onload = resolve;
      js.onerror = reject;

      fjs.parentNode.insertBefore(js, fjs);
    } catch (err) {
      reject(err);
    }
  });
}
