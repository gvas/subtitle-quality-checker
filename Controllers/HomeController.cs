using Microsoft.AspNet.Mvc;
using Microsoft.Extensions.OptionsModel;
using SubtitleEvaluation.Web.Services;
using SubtitleEvaluation.Web.Internal;

namespace SubtitleEvaluation.Web.Controllers
{
    public class HomeController : Controller
    {
        private readonly HostingOptions hostingOptions;

        public HomeController(IOptions<HostingOptions> optionsAccessor)
        {
            this.hostingOptions = optionsAccessor.Value;
        }

        public IActionResult Index()
        {
            var viewModel = new SubtitleEvaluation.Web.ViewModels.Home.Base();
            PopulateBaseViewModel(viewModel);

            // {auto} is a magic string in the JavaScriptViewEngine library
            return View("js-{auto}", viewModel);
        }

        [Route("results")]
        public IActionResult Results()
        {
            return RedirectToAction("Index");
        }

        [Route("settings")]
        public IActionResult Settings()
        {
            var viewModel = new SubtitleEvaluation.Web.ViewModels.Home.Base();
            PopulateBaseViewModel(viewModel);

            // {auto} is a magic string in the JavaScriptViewEngine library
            return View("js-{auto}", viewModel);
        }

        [Route("about")]
        public IActionResult About()
        {
            var viewModel = new SubtitleEvaluation.Web.ViewModels.Home.Base();
            PopulateBaseViewModel(viewModel);

            // {auto} is a magic string in the JavaScriptViewEngine library
            return View("js-{auto}", viewModel);
        }

        private void PopulateBaseViewModel(SubtitleEvaluation.Web.ViewModels.Home.Base viewModel)
        {
            viewModel.VirtualApplicationRootPath = hostingOptions.VirtualApplicationRootPath;
            viewModel.UserAgent = Request.Headers["User-Agent"];
            viewModel.SerializedSettings = Request.HttpContext.Request.Cookies[Constants.SETTINGS_COOKIE_NAME];
        }
    }
}
