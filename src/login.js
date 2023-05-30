import './App.css';
import NavBar from './components/Navbar';
import About from './pages/About';
import { Routes, Route } from 'react-router-dom'

import('preline')

function App() {
  return (
    <div class="relative py-16 bg-gradient-to-br from-sky-50 to-gray-200">  
    <div class="relative container m-auto px-6 text-gray-500 md:px-12 xl:px-40">
        <div class="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
            <div class="rounded-xl bg-white shadow-xl">
                <div class="p-6 sm:p-16">
                    <div class="space-y-4">
                    <img src={require('./uvic-wordmark-colour.svg').default} loading="lazy" className="w-20" alt="uvic logo" />
                        <h2 class="mb-8 text-2xl text-cyan-900 font-bold">Sign in to Uvic <br /></h2>
                    </div>
                    <div class="mt-16 grid space-y-4">
                        <input
                          type="text"
                          placeholder="Username"
                          class="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
                          hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
                        />
                    
                    <input
                          type="text"
                          placeholder="Password"
                          class="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
                          hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
                        />
                    </div>

                    <div class="mt-32 space-y-4 text-gray-600 text-center sm:-mb-8">
                        <p class="text-xs">By proceeding, you agree to our <a href="#" class="underline">Terms of Use</a> and confirm you have read our <a href="#" class="underline">Privacy and Cookie Statement</a>.</p>
                        <p class="text-xs">This site is protected by reCAPTCHA and the <a href="#" class="underline">Google Privacy Policy</a> and <a href="#" class="underline">Terms of Service</a> apply.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


  );
}

export default App;
