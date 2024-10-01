import React, { useEffect, useRef } from 'react';

const WaterSection = () => {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight / 2; // Limit height to half the screen for the effect

    let particles = [];
    const mouse = { x: 0, y: 0, isInSection: false };

    // Mouse move event
    const mouseMove = (event) => {
      if (mouse.isInSection) {
        mouse.x = event.clientX - canvas.getBoundingClientRect().left;
        mouse.y = event.clientY - canvas.getBoundingClientRect().top;
      }
    };

    const mouseEnter = () => {
      mouse.isInSection = true;
    };

    const mouseLeave = () => {
      mouse.isInSection = false;
    };

    // Attach event listeners to the section
    sectionRef.current.addEventListener('mousemove', mouseMove);
    sectionRef.current.addEventListener('mouseenter', mouseEnter);
    sectionRef.current.addEventListener('mouseleave', mouseLeave);

    // Create particle object for water ripples
    function Particle(x, y) {
      this.x = x;
      this.y = y;
      this.radius = 0;
      this.maxRadius = 100 + Math.random() * 50; // Larger ripples
      this.speed = 1 + Math.random() * 0.5;
      this.opacity = 1;

      this.update = () => {
        if (this.radius < this.maxRadius) {
          this.radius += this.speed;
          this.opacity -= 0.01;
        }
      };

      this.draw = () => {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.strokeStyle = `rgba(0, 255, 255, ${this.opacity})`; // Neon cyan
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.closePath();
      };
    }

    const addParticle = (x, y) => {
      particles.push(new Particle(x, y));
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        if (particle.opacity <= 0) {
          particles.splice(index, 1); // Remove faded-out particles
        }
      });

      requestAnimationFrame(animate);
    };

    const addParticlesOnMouseMove = () => {
      if (mouse.isInSection) {
        addParticle(mouse.x, mouse.y);
      }
    };

    sectionRef.current.addEventListener('mousemove', addParticlesOnMouseMove);

    animate();

    // Clean up event listeners when component unmounts
    return () => {
      sectionRef.current.removeEventListener('mousemove', mouseMove);
      sectionRef.current.removeEventListener('mouseenter', mouseEnter);
      sectionRef.current.removeEventListener('mouseleave', mouseLeave);
      sectionRef.current.removeEventListener('mousemove', addParticlesOnMouseMove);
    };
  }, []);

  return (
    <div ref={sectionRef} className="w-full h-96 overflow-hidden relative bg-gray-900">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
      <div className="relative z-10 flex items-center justify-center h-full">
        <h2 className="text-4xl font-bold text-white neon-text">Water Simulation</h2>
      </div>
    </div>
  );
};

export default WaterSection;
