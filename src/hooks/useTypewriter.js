import { useState, useEffect } from 'react';

/**
 * useTypewriter - Cycles through suggestions and types them out letter-by-letter
 */
export function useTypewriter(
  words = [
    "Samsung Galaxy S25 Ultra...",
    "Apple iPhone 16 Pro Max...",
    "Samsung The Frame Smart TV...",
    "Apple MacBook Pro 16...",
    "Sony PlayStation 5 Pro...",
    "Sony WH-1000XM5 Quloqchin...",
    "Apple AirPods Pro 2...",
    "Samsung Neo QLED 65 TV...",
    "Xiaomi 15 Ultra 5G...",
    "Gadjetlar yoki ID (#p2)..."
  ],
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseTime = 1600
) {
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];

    if (!isDeleting && displayText === currentWord) {
      const pauseTimer = setTimeout(() => {
        setIsDeleting(true);
      }, pauseTime);
      return () => clearTimeout(pauseTimer);
    }

    if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentWord.slice(0, displayText.length + 1));
      } else {
        setDisplayText(currentWord.slice(0, displayText.length - 1));
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return displayText;
}
