"use client";

import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

const PHRASES = [
  "We're spending on channels no one's validated.",
  "Three agencies gave us three different diagnoses.",
  "The reports are impressive. The board isn't.",
  "Every report celebrates a number nobody asked for.",
  "More budget didn't fix the leak. It just made it bigger.",
  "Attribution says one thing. Sales say another.",
  "CPMs are down. Growth isn't up.",
  "That's exactly what we diagnose.",
  "Our best campaign still isn't profitable.",
  "We don't know if it's the offer, the funnel, or the ads.",
  "We scaled the ad spend. CAC scaled faster.",
  "The dashboard says it's working. The bank account disagrees.",
  "We keep hitting the same ceiling, quarter after quarter.",
  "Our ROAS looks great. Revenue isn't moving.",
  "Nobody's told us the campaign wasn't the problem.",
  "We've tested everything except our assumptions.",
  "Retention is the real problem. Everyone keeps optimising acquisition.",
];

export default function MatterPhysicsCards() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activePhrases, setActivePhrases] = useState(PHRASES);

  // Handle responsive slicing for mobile (e.g., width < 768px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setActivePhrases(PHRASES.slice(0, 12));
      } else {
        setActivePhrases(PHRASES);
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!sceneRef.current) return;

    const container = sceneRef.current;
    let engine: Matter.Engine | null = null;
    let runner: Matter.Runner | null = null;
    let world: Matter.World | null = null;
    let animationFrameId: number;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !engine) {
          initPhysics();
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(container);

    const initPhysics = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      // 1. Create Engine
      engine = Matter.Engine.create({
        gravity: { x: 0, y: 1.2, scale: 0.001 },
      });
      world = engine.world;

      // 2. Add Boundaries
      const floor = Matter.Bodies.rectangle(
        width / 2,
        height + 30,
        width * 2,
        60,
        {
          isStatic: true,
          restitution: 0.3,
        },
      );
      const leftWall = Matter.Bodies.rectangle(
        -30,
        height / 2,
        60,
        height * 2,
        {
          isStatic: true,
        },
      );
      const rightWall = Matter.Bodies.rectangle(
        width + 30,
        height / 2,
        60,
        height * 2,
        {
          isStatic: true,
        },
      );

      Matter.World.add(world, [floor, leftWall, rightWall]);

      // 3. Create Rigid Bodies with fixed initial tilt angles
      const cardBodies: { body: Matter.Body; initialAngle: number }[] = [];

      cardsRef.current.forEach((el, index) => {
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const startX = Math.random() * (width - rect.width) + rect.width / 2;
        const startY = -120 - index * 100;

        const initialAngle = (Math.random() - 0.5) * 0.45;

        const body = Matter.Bodies.rectangle(
          startX,
          startY,
          rect.width,
          rect.height,
          {
            restitution: 0.25,
            friction: 0.3,
            frictionAir: 0.02,
            inertia: Infinity,
            angle: initialAngle,
          },
        );

        Matter.Body.setInertia(body, Infinity);

        cardBodies.push({ body, initialAngle });
        Matter.World.add(world!, body);
      });

      // 4. Mouse Drag Setup - Only for Desktop (1024px and wider)
      if (window.innerWidth >= 1024) {
        const mouse = Matter.Mouse.create(container);
        const mouseConstraint = Matter.MouseConstraint.create(engine, {
          mouse: mouse,
          constraint: {
            stiffness: 0.2,
            render: {
              visible: false,
            },
          },
        });

        Matter.World.add(world, mouseConstraint);

        mouse.element.removeEventListener(
          "mousewheel",
          (mouse as any).mousewheel,
        );
        mouse.element.removeEventListener(
          "DOMMouseScroll",
          (mouse as any).mousewheel,
        );
      }

      // 5. Run Engine
      runner = Matter.Runner.create();
      Matter.Runner.run(runner, engine);

      // 6. Sync DOM position with static initial tilt
      const updatePositions = () => {
        cardBodies.forEach(({ body, initialAngle }, i) => {
          const el = cardsRef.current[i];
          if (el) {
            const { x, y } = body.position;

            Matter.Body.setAngularVelocity(body, 0);

            el.style.transform = `translate3d(${x - el.offsetWidth / 2}px, ${
              y - el.offsetHeight / 2
            }px, 0px) rotate(${initialAngle}rad)`;
          }
        });
        animationFrameId = requestAnimationFrame(updatePositions);
      };

      updatePositions();
    };

    return () => {
      observer.disconnect();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (runner) Matter.Runner.stop(runner);
      if (world && engine) {
        Matter.World.clear(world, false);
        Matter.Engine.clear(engine);
      }
    };
  }, [activePhrases]);

  return (
    <section
      ref={sceneRef}
      className="relative w-full h-[120vh] bg-[#1A1A1A] overflow-hidden"
    >
      {activePhrases.map((text, i) => {
        const isHighlight = text === "That's exactly what we diagnose.";
        return (
          <div
            key={i}
            ref={(el) => {
              cardsRef.current[i] = el;
            }}
            className={`absolute top-0 left-0 px-4 py-2.5 lg:px-[1.39vw] lg:py-[0.83vw] rounded-md text-[14px] lg:text-[1.11vw] lg:h-[5vw] items-center justify-center flex leading-[120%] tracking-tight select-none pointer-events-none lg:pointer-events-auto lg:cursor-grab font-haas lg:active:cursor-grabbing max-lg:w-[230px] ${
              isHighlight
                ? "bg-[#FFD000] text-black lg:text-[20px] text-[16px] font-familjen!"
                : "bg-white"
            }`}
            style={{
              willChange: "transform",
            }}
          >
            {text}
          </div>
        );
      })}
    </section>
  );
}