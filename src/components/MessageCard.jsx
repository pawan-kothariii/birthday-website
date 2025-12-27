import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import Confetti from "./Confetti";
import "./MessageCard.css";

function MessageCard({ isActive }) {
  const [curtainsOpened, setCurtainsOpened] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const prevIsActive = useRef(isActive);

  const curtainLeftRef = useRef(null);
  const curtainRightRef = useRef(null);
  const curtainHintRef = useRef(null);
  const messageContentRef = useRef(null);

  const message = `Nidhi,

Hope your day is full of cake, laughter, and all the love you deserve!
You seriously make everything more fun just by being around, and we’re so glad to call you our friend.

From random laughs to all the everyday hostel moments, you’ve made these days lighter and happier.
You’re sweet, fun, and always bring such good energy with you.

Wishing you a year full of happiness, growth, and lots of new memories.
Stay the same amazing person you are and keep spreading those good vibes ✨

Have the best birthday ever 🥳💖
— LEVEL`;

  useEffect(() => {
    if (isActive && !prevIsActive.current) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      prevIsActive.current = isActive;
      return () => clearTimeout(timer);
    }

    if (!isActive && prevIsActive.current) {
      setCurtainsOpened(false);

      if (messageContentRef.current) {
        gsap.set(messageContentRef.current, {
          opacity: 0,
          scale: 0.9,
        });
      }
    }

    prevIsActive.current = isActive;
  }, [isActive]);

  const handleOpenCurtains = () => {
    if (curtainsOpened) return;

    setCurtainsOpened(true);

    gsap.to(curtainHintRef.current, {
      opacity: 0,
      duration: 0.3,
    });

    gsap.to(curtainLeftRef.current, {
      x: "-100%",
      duration: 1,
      ease: "power2.inOut",
    });

    gsap.to(curtainRightRef.current, {
      x: "100%",
      duration: 1,
      ease: "power2.inOut",
    });

    gsap.to(messageContentRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1,
      delay: 0.6,
      ease: "back.out(1.2)",
    });
  };

  return (
    <section className="message">
      <h2>💌 A Message From Our Heart</h2>

      <div className="curtain-container">
        <div className="curtain-rod" />

        <div
          className="curtain-wrapper"
          role="button"
          tabIndex={0}
          aria-label="Click or tap to open the curtains"
          onClick={handleOpenCurtains}
        >
          <div ref={curtainLeftRef} className="curtain curtain-left" />
          <div ref={curtainRightRef} className="curtain curtain-right" />

          {!curtainsOpened && (
            <div ref={curtainHintRef} className="curtain-hint">
              ✨ Click to Open ✨
            </div>
          )}
        </div>

        <div ref={messageContentRef} className="message-content">
          <p className="typed-text">{message}</p>
        </div>
      </div>

      {showConfetti && <Confetti />}
    </section>
  );
}

export default MessageCard;