"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import LayoutWrapper from "../wrapper/LayoutWrapper";
import Button from "../../ui/button/Button";
import ArrowIcon from "../../icons/ArrowIcon";
import { navLinks } from "@/shared/data/nav-links";

const menuVariants: Variants = {
  closed: {
    opacity: 0,
    y: "-10%",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      when: "afterChildren",
    },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  closed: { opacity: 0, y: 15 },
  open: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

interface MobileNavbarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNavbar({ isOpen, onClose }: MobileNavbarProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.nav
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
          // touch-none stops touch propagation; overscroll-contain keeps interactions inside
          className="fixed inset-0 z-[-1] w-full h-screen bg-black lg:hidden flex flex-col justify-start pt-[80px] touch-none overscroll-contain"
        >
          <LayoutWrapper>
            <div className="flex flex-col gap-6 mt-[32px]">
              {navLinks.map((link) => (
                <motion.div key={link.id || link.href} variants={itemVariants}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="text-[32px] leading-[100%] text-white block"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div variants={itemVariants}>
              <Button variant="secondary" className="mt-[48px]">
                BOOK A DIAGNOSIS <ArrowIcon className="ml-1.5" />
              </Button>
            </motion.div>
          </LayoutWrapper>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}