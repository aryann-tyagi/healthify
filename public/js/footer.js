let appFooter = `
<footer class="bg-gray-900 p-10 md:p-[3em] transition-all duration-500" id="footerid">
    <div class="max-w-screen-xl mx-auto flex flex-wrap justify-between gap-8 lg:items-stretch lg:gap-0">
      <!-- col 1 -->
      <div class="w-full flex flex-col justify-between items-center gap-5 lg:w-1/5 lg:pr-5 animate__animated animate__fadeInUp" data-aos="fade-up">
        <div class="mb-4">
          <span class="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">Healthify</span>
        </div>
        <nav aria-labelledby="social-media-links">
          <ul class="flex gap-5 my-2 lg:my-auto">
            <li class="hover:-translate-y-1 transition-transform duration-300">
              <a class="text-gray-300 hover:text-blue-400 text-xl lg:text-lg"
                href="https://www.facebook.com"
                aria-label="Facebook profile">
                <i class="fa-brands fa-facebook"></i>
              </a>
            </li>
            <li class="hover:-translate-y-1 transition-transform duration-300">
              <a class="text-gray-300 hover:text-blue-400 text-xl lg:text-lg" 
                href="https://github.com/aryann-tyagi" aria-label="Github account">
                <i class="fa-brands fa-github"></i>
              </a>
            </li>
            <li class="hover:-translate-y-1 transition-transform duration-300">
              <a class="text-gray-300 hover:text-blue-400 text-xl lg:text-lg"
                href="https://www.linkedin.com/in/aryan-tyagi-6b3190330?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                aria-label="LinkedIn profile">
                <i class="fa-brands fa-linkedin"></i>
              </a>
            </li>
            <li class="hover:-translate-y-1 transition-transform duration-300">
              <a class="text-gray-300 hover:text-blue-400 text-xl lg:text-lg"
                href="https://www.instagram.com/_.aryaannx/"
                aria-label="Instagram profile">
                <i class="fa-brands fa-instagram"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <!-- col 2 -->
      <div class="w-full flex flex-col gap-5 lg:w-1/5 lg:pr-5 animate__animated animate__fadeInUp" data-aos="fade-up" data-aos-delay="100">
        <h3 class="text-white font-semibold text-lg mb-2">Quick Links</h3>
        <nav aria-labelledby="footer-nav-1">
          <ul class="flex flex-col items-center gap-3 lg:items-start lg:gap-3">
            <li class="w-full hover:translate-x-1 transition-transform duration-300">
              <a class="text-gray-300 hover:text-blue-400" href="./">Home</a>
            </li>
            <li class="w-full hover:translate-x-1 transition-transform duration-300">
              <a class="text-gray-300 hover:text-blue-400" href="./blogs.html">Blog</a>
            </li>
            <li class="w-full hover:translate-x-1 transition-transform duration-300">
              <a class="text-gray-300 hover:text-blue-400" href="./review.html">Review | Suggestion</a>
            </li>
          </ul>
        </nav> 
      </div>
      <!-- col 3 -->
      <div class="w-full flex flex-col gap-5 lg:w-1/5 lg:pr-5 animate__animated animate__fadeInUp" data-aos="fade-up" data-aos-delay="200">
        <h3 class="text-white font-semibold text-lg mb-2">Connect</h3>
        <nav aria-labelledby="footer-nav-2">
          <ul class="flex flex-col items-center gap-3 lg:items-start lg:gap-3">
            <li class="w-full hover:translate-x-1 transition-transform duration-300">
              <a class="text-gray-300 hover:text-blue-400"
                href="https://www.linkedin.com/in/aryan-tyagi-6b3190330?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">Contact Developer</a>
            </li>
            <li class="w-full hover:translate-x-1 transition-transform duration-300">
              <a class="text-gray-300 hover:text-blue-400"
                href="mailto:42223210009@stu.srmuniversity.ac.in">Email Us</a>
            </li>
          </ul>
        </nav>
      </div>
      <!-- col 4 -->
      <div class="w-full flex flex-col items-center lg:items-end lg:w-2/5 animate__animated animate__fadeInUp" data-aos="fade-up" data-aos-delay="300">
        <h3 class="text-white font-semibold text-lg mb-2">Newsletter</h3>
        <form class="w-full max-w-md">
          <div class="flex gap-2 mb-3">
            <input type="email" placeholder="Your email" class="flex-1 px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400">
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300">Subscribe</button>
          </div>
        </form>
        <span class="mt-4 text-gray-400 text-sm">© ${new Date().getFullYear()} Healthify. All Rights Reserved</span>
      </div>
    </div>
  </footer>
`;

document.getElementById("app-footer").innerHTML = appFooter;