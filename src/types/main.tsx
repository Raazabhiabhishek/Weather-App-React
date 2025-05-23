@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .animate-float {
    animation: float 15s ease-in-out infinite;
  }
  
  .animate-float-delayed {
    animation: float 18s ease-in-out 2s infinite;
  }
  
  .animate-float-slow {
    animation: float 25s ease-in-out 1s infinite;
  }
  
  .animate-pulse-slow {
    animation: pulse 10s ease-in-out infinite;
  }
  
  .animate-fade-in {
    animation: fadeIn 0.5s ease-out;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(-20px) translateX(15px);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.2;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.rain-container {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.rain-drop {
  position: absolute;
  top: -20px;
  animation: rain linear infinite;
}

@keyframes rain {
  0% {
    transform: translateY(0);
    opacity: 0;
  }
  10% {
    opacity: 0.8;
  }
  90% {
    opacity: 0.8;
  }
  100% {
    transform: translateY(100vh);
    opacity: 0;
  }
}
