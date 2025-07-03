'use client';

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

// Define character sets
const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const DIGITS = "0123456789";
const SPECIAL = "!@#$%^&*()_+-=[]{}|;:,.<>?";

export default function PasswordGenerator() {
  const [length, setLength] = useState<number>(12);
  const [useUpper, setUseUpper] = useState<boolean>(true);
  const [useLower, setUseLower] = useState<boolean>(true);
  const [useDigits, setUseDigits] = useState<boolean>(true);
  const [useSpecial, setUseSpecial] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const generatePassword = useCallback(() => {
    const selectedSets: string[] = [];
    if (useUpper) selectedSets.push(UPPERCASE);
    if (useLower) selectedSets.push(LOWERCASE);
    if (useDigits) selectedSets.push(DIGITS);
    if (useSpecial) selectedSets.push(SPECIAL);

    if (selectedSets.length === 0) {
      setPassword("Please select at least one character type.");
      return;
    }

    const allChars = selectedSets.join("");

    // Ensure each selected set appears at least once
    const resultChars: string[] = [];
    selectedSets.forEach((set) => {
      resultChars.push(set[Math.floor(Math.random() * set.length)]);
    });

    for (let i = resultChars.length; i < length; i += 1) {
      resultChars.push(allChars[Math.floor(Math.random() * allChars.length)]);
    }

    // Shuffle the result to avoid predictable positions
    for (let i = resultChars.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [resultChars[i], resultChars[j]] = [resultChars[j], resultChars[i]];
    }

    const finalPassword = resultChars.join("");
    setPassword(finalPassword);

    // copy to clipboard silently
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(finalPassword).catch(() => {
        /* ignore */
      });
    }
  }, [length, useUpper, useLower, useDigits, useSpecial]);

  // Auto-generate whenever settings change
  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const handleLengthChange = (value: number) => {
    if (value < 8) value = 8;
    setLength(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-6 sm:p-12 relative">
        {/* Home button */}
        <Link
          href="/"
          className="absolute top-4 left-4 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors rounded-full p-2 text-3xl"
        >
          ←
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">Password Generator</h1>

          <div className="flex flex-col gap-6">
            {/* Length */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Password length: <span className="text-blue-600 dark:text-blue-400 font-semibold">{length}</span>
              </label>
              <input
                type="range"
                min={8}
                max={64}
                value={length}
                onChange={(e) => handleLengthChange(Number(e.target.value))}
                className="w-full cursor-pointer accent-blue-600"
              />
            </div>

            {/* Character set toggles */}
            <div className="grid grid-cols-1 gap-3">
              <label className="inline-flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useUpper}
                  onChange={(e) => setUseUpper(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Uppercase (A-Z)</span>
              </label>
              <label className="inline-flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useLower}
                  onChange={(e) => setUseLower(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Lowercase (a-z)</span>
              </label>
              <label className="inline-flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useDigits}
                  onChange={(e) => setUseDigits(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Digits (0-9)</span>
              </label>
              <label className="inline-flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useSpecial}
                  onChange={(e) => setUseSpecial(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Special (!@#$%^&*)</span>
              </label>
            </div>

            {password && (
              <div className="mt-4 break-all rounded-lg border border-gray-200 dark:border-gray-600 p-4 text-center select-all bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm">
                {password}
              </div>
            )}

            <button
              onClick={handleCopy}
              disabled={!password}
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
            >
              {copied ? (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy Password
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 