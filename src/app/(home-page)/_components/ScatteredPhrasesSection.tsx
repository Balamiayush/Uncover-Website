"use client";

import React, { useEffect, useRef } from "react";
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

  useEffect(() => {
    if (!sceneRef.current) return;

    const container = sceneRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Create Engine & World
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 1.2, scale: 0.001 },
    });
    const world = engine.world;

    // 2. Add Boundaries (Floor & Walls)
    const floor = Matter.Bodies.rectangle(
      width / 2,
      height + 30,
      width * 2,
      60,
      {
        isStatic: true,
        restitution: 0.4,
      }
    );
    const leftWall = Matter.Bodies.rectangle(-30, height / 2, 60, height * 2, {
      isStatic: true,
    });
    const rightWall = Matter.Bodies.rectangle(
      width + 30,
      height / 2,
      60,
      height * 2,
      {
        isStatic: true,
      }
    );

    Matter.World.add(world, [floor, leftWall, rightWall]);

    // 3. Create Bodies for DOM Elements
    const cardBodies: Matter.Body[] = [];

    cardsRef.current.forEach((el, index) => {
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const startX = Math.random() * (width - rect.width) + rect.width / 2;
      const startY = -100 - index * 120; // Staggered height above canvas

      const body = Matter.Bodies.rectangle(
        startX,
        startY,
        rect.width,
        rect.height,
        {
          restitution: 0.5, // Bounce factor
          friction: 0.2,
          frictionAir: 0.02,
          angle: (Math.random() - 0.5) * 0.5,
        }
      );

      cardBodies.push(body);
      Matter.World.add(world, body);
    });

    // 4. Mouse Drag & Touch Interaction Setup
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

    // Keep mouse synced on page scroll
    mouse.element.removeEventListener("mousewheel", (mouse as any).mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", (mouse as any).mousewheel);

    // 5. Runner
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    // 6. Sync Loop (Matter.js Body -> DOM Element position)
    let animationFrameId: number;

    const updatePositions = () => {
      cardBodies.forEach((body, i) => {
        const el = cardsRef.current[i];
        if (el) {
          const { x, y } = body.position;
          const angle = body.angle;
          el.style.transform = `translate3d(${x - el.offsetWidth / 2}px, ${
            y - el.offsetHeight / 2
          }px, 0px) rotate(${angle}rad)`;
        }
      });
      animationFrameId = requestAnimationFrame(updatePositions);
    };

    updatePositions();

    return () => {
      cancelAnimationFrame(animationFrameId);
      Matter.Runner.stop(runner);
      Matter.World.clear(world, false);
      Matter.Engine.clear(engine);
    };
  }, []);

  return (
    <section
      ref={sceneRef}
      className="relative w-full h-screen bg-[#1A1A1A] overflow-hidden"
    >
      {PHRASES.map((text, i) => {
        const isHighlight = text === "That's exactly what we diagnose.";
        return (
          <div
            key={i}
            ref={(el) => {
              cardsRef.current[i] = el;
            }}
            className={`absolute top-0 left-0 px-4 py-2.5 lg:px-[1.39vw] lg:py-[0.83vw] rounded-md text-[12px] lg:text-[1.11vw] lg:h-[5vw] items-center justify-center flex  leading-[120%] tracking-tight  select-none pointer-events-auto cursor-grab active:cursor-grabbing ${
              isHighlight
                ? "bg-[#FFD000] text-black font-semibold"
                : "bg-white text-[#111111]"
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