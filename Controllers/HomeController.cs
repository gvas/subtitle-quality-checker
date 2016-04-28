using Microsoft.AspNet.Mvc;

namespace SubtitleEvalution.Web.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            // {auto} is a magic string in the JavaScriptViewEngine library
            return View("js-{auto}", new SubtitleEvaluation.Web.ViewModels.Home.Index
            {
                UserAgent = Request.Headers["User-Agent"]
            });
        }

        [Route("settings")]
        public IActionResult Settings()
        {
            return View("js-{auto}", new SubtitleEvaluation.Web.ViewModels.Home.Settings
            {
                UserAgent = Request.Headers["User-Agent"]
            });
        }

        [Route("about")]
        public IActionResult About()
        {
            return View("js-{auto}", new SubtitleEvaluation.Web.ViewModels.Home.About
            {
                UserAgent = Request.Headers["User-Agent"]
            });
        }
    }
}
