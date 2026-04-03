/**
 * Element Highlighter Utility
 * Highlights web elements during test execution for visual debugging and documentation
 */

class ElementHighlighter {
  /**
   * Constructor
   * @param {Page} page - Playwright page object
   * @param {Object} options - Configuration options
   */
  constructor(page, options = {}) {
    this.page = page;
    this.highlightColor = options.highlightColor || '#FFD700';  // Yellow
    this.highlightBorder = options.highlightBorder || '3px solid #FF0000';  // Red border
    this.highlightDuration = options.highlightDuration || 1000; // milliseconds
    this.scrollIntoView = options.scrollIntoView !== false;
    this.takesScreenshot = options.takesScreenshot !== false;
    this.highlightedElements = [];
  }

  /**
   * Highlight a single element by selector
   * @param {string} selector - CSS selector of the element
   * @param {number} duration - Duration to keep element highlighted (ms)
   */
  async highlightElement(selector, duration = this.highlightDuration) {
    try {
      const element = await this.page.$(selector);
      if (!element) {
        console.log(`⚠️  Element not found: ${selector}`);
        return false;
      }

      // Scroll element into view
      if (this.scrollIntoView) {
        await element.scrollIntoViewIfNeeded();
      }

      // Apply highlight style
      await this.page.evaluate((sel, color, border) => {
        const el = document.querySelector(sel);
        if (el) {
          el.style.backgroundColor = color;
          el.style.border = border;
          el.style.boxShadow = `0 0 10px ${color}, inset 0 0 10px ${color}`;
          el.style.transition = 'all 0.3s ease';
        }
      }, selector, this.highlightColor, this.highlightBorder);

      console.log(`✨ Highlighted: ${selector}`);
      this.highlightedElements.push(selector);

      // Remove highlight after duration
      await this.page.waitForTimeout(duration);
      await this.removeHighlight(selector);

      return true;
    } catch (error) {
      console.error(`❌ Error highlighting element ${selector}:`, error.message);
      return false;
    }
  }

  /**
   * Highlight multiple elements by selector
   * @param {string} selector - CSS selector for multiple elements
   * @param {number} delayBetween - Delay between highlighting each element (ms)
   */
  async highlightElements(selector, delayBetween = 500) {
    try {
      const count = await this.page.$$eval(selector, elements => elements.length);
      console.log(`🎨 Highlighting ${count} elements with selector: ${selector}`);

      for (let i = 0; i < count; i++) {
        const elementSelector = `${selector}:nth-of-type(${i + 1})`;
        await this.highlightElement(elementSelector, this.highlightDuration);
        if (i < count - 1) {
          await this.page.waitForTimeout(delayBetween);
        }
      }

      return true;
    } catch (error) {
      console.error(`❌ Error highlighting multiple elements ${selector}:`, error.message);
      return false;
    }
  }

  /**
   * Highlight element and take screenshot
   * @param {string} selector - CSS selector of the element
   * @param {string} screenshotName - Name for the screenshot
   */
  async highlightAndScreenshot(selector, screenshotName) {
    try {
      const element = await this.page.$(selector);
      if (!element) {
        console.log(`⚠️  Element not found: ${selector}`);
        return false;
      }

      // Scroll into view
      if (this.scrollIntoView) {
        await element.scrollIntoViewIfNeeded();
      }

      // Apply highlight
      await this.page.evaluate((sel, color, border) => {
        const el = document.querySelector(sel);
        if (el) {
          el.style.backgroundColor = color;
          el.style.border = border;
          el.style.boxShadow = `0 0 10px ${color}, inset 0 0 10px ${color}`;
          el.style.zIndex = '9999';
        }
      }, selector, this.highlightColor, this.highlightBorder);

      // Take screenshot
      const screenshotPath = `./screenshots/${screenshotName}.png`;
      await this.page.screenshot({ path: screenshotPath });
      console.log(`📸 Screenshot saved: ${screenshotPath}`);

      // Remove highlight
      await this.removeHighlight(selector);

      return true;
    } catch (error) {
      console.error(`❌ Error in highlightAndScreenshot:`, error.message);
      return false;
    }
  }

  /**
   * Highlight element before interaction
   * @param {string} selector - CSS selector
   * @param {string} action - Action being performed (click, fill, etc.)
   */
  async highlightBeforeAction(selector, action = 'interact') {
    try {
      const element = await this.page.$(selector);
      if (!element) {
        console.log(`⚠️  Element not found: ${selector}`);
        return false;
      }

      console.log(`🎯 ${action.toUpperCase()}: ${selector}`);

      // Scroll into view
      if (this.scrollIntoView) {
        await element.scrollIntoViewIfNeeded();
      }

      // Apply highlight with animation
      await this.page.evaluate((sel, color, border) => {
        const el = document.querySelector(sel);
        if (el) {
          // Create animation keyframes
          const style = document.createElement('style');
          style.textContent = `
            @keyframes highlightPulse {
              0% { box-shadow: 0 0 5px ${color}; }
              50% { box-shadow: 0 0 20px ${color}, inset 0 0 10px ${color}; }
              100% { box-shadow: 0 0 5px ${color}; }
            }
          `;
          document.head.appendChild(style);

          el.style.border = border;
          el.style.animation = 'highlightPulse 0.6s ease-in-out';
          el.style.backgroundColor = color;
          el.style.opacity = '0.9';
        }
      }, selector, this.highlightColor, this.highlightBorder);

      // Keep highlight briefly then remove
      await this.page.waitForTimeout(800);
      await this.removeHighlight(selector);

      return true;
    } catch (error) {
      console.error(`❌ Error in highlightBeforeAction:`, error.message);
      return false;
    }
  }

  /**
   * Highlight element with blinking effect
   * @param {string} selector - CSS selector
   * @param {number} duration - Total duration of blinking (ms)
   * @param {number} blinkSpeed - Speed of blinking (ms per blink)
   */
  async highlightWithBlink(selector, duration = 1000, blinkSpeed = 300) {
    try {
      const element = await this.page.$(selector);
      if (!element) {
        console.log(`⚠️  Element not found: ${selector}`);
        return false;
      }

      // Scroll into view
      if (this.scrollIntoView) {
        await element.scrollIntoViewIfNeeded();
      }

      // Apply blinking animation
      await this.page.evaluate((sel, color, border, speed) => {
        const el = document.querySelector(sel);
        if (el) {
          // Create blinking animation keyframes
          const style = document.createElement('style');
          style.textContent = `
            @keyframes blink {
              0% { 
                background-color: ${color};
                border: ${border};
                box-shadow: 0 0 10px ${color};
                opacity: 1;
              }
              50% { 
                background-color: transparent;
                border: ${border};
                box-shadow: none;
                opacity: 0.3;
              }
              100% { 
                background-color: ${color};
                border: ${border};
                box-shadow: 0 0 10px ${color};
                opacity: 1;
              }
            }
          `;
          document.head.appendChild(style);

          el.style.animation = `blink ${speed}ms infinite`;
        }
      }, selector, this.highlightColor, this.highlightBorder, blinkSpeed);

      console.log(`💫 Blinking: ${selector} (duration: ${duration}ms, speed: ${blinkSpeed}ms)`);
      this.highlightedElements.push(selector);

      // Stop blinking after duration
      await this.page.waitForTimeout(duration);
      await this.removeHighlight(selector);

      return true;
    } catch (error) {
      console.error(`❌ Error in highlightWithBlink:`, error.message);
      return false;
    }
  }

  /**
   * Highlight element with rapid blinking effect
   * @param {string} selector - CSS selector
   * @param {number} duration - Total duration of blinking (ms)
   */
  async highlightWithRapidBlink(selector, duration = 1000) {
    try {
      const element = await this.page.$(selector);
      if (!element) {
        console.log(`⚠️  Element not found: ${selector}`);
        return false;
      }

      // Scroll into view
      if (this.scrollIntoView) {
        await element.scrollIntoViewIfNeeded();
      }

      // Apply rapid blinking animation
      await this.page.evaluate((sel, color, border) => {
        const el = document.querySelector(sel);
        if (el) {
          const style = document.createElement('style');
          style.textContent = `
            @keyframes rapidBlink {
              0%, 49% { 
                background-color: ${color};
                border: ${border};
                box-shadow: 0 0 15px ${color}, inset 0 0 10px ${color};
                opacity: 1;
              }
              50%, 100% { 
                background-color: rgba(255, 255, 255, 0.1);
                border: ${border};
                box-shadow: none;
                opacity: 0.2;
              }
            }
          `;
          document.head.appendChild(style);

          el.style.animation = 'rapidBlink 200ms infinite';
        }
      }, selector, this.highlightColor, this.highlightBorder);

      console.log(`⚡ Rapid Blinking: ${selector} (duration: ${duration}ms)`);
      this.highlightedElements.push(selector);

      // Stop blinking after duration
      await this.page.waitForTimeout(duration);
      await this.removeHighlight(selector);

      return true;
    } catch (error) {
      console.error(`❌ Error in highlightWithRapidBlink:`, error.message);
      return false;
    }
  }

  /**
   * Highlight element with fade in/out blinking effect
   * @param {string} selector - CSS selector
   * @param {number} duration - Total duration of blinking (ms)
   */
  async highlightWithFadeBlink(selector, duration = 1000) {
    try {
      const element = await this.page.$(selector);
      if (!element) {
        console.log(`⚠️  Element not found: ${selector}`);
        return false;
      }

      // Scroll into view
      if (this.scrollIntoView) {
        await element.scrollIntoViewIfNeeded();
      }

      // Apply fade blinking animation
      await this.page.evaluate((sel, color, border) => {
        const el = document.querySelector(sel);
        if (el) {
          const style = document.createElement('style');
          style.textContent = `
            @keyframes fadeBlink {
              0% { 
                background-color: ${color};
                border: ${border};
                box-shadow: 0 0 20px ${color}, inset 0 0 15px ${color};
                opacity: 1;
              }
              25% { 
                background-color: rgba(255, 107, 107, 0.5);
                box-shadow: 0 0 10px ${color};
                opacity: 0.7;
              }
              50% { 
                background-color: transparent;
                border: ${border};
                box-shadow: none;
                opacity: 0.1;
              }
              75% { 
                background-color: rgba(255, 107, 107, 0.5);
                box-shadow: 0 0 10px ${color};
                opacity: 0.7;
              }
              100% { 
                background-color: ${color};
                border: ${border};
                box-shadow: 0 0 20px ${color}, inset 0 0 15px ${color};
                opacity: 1;
              }
            }
          `;
          document.head.appendChild(style);

          el.style.animation = 'fadeBlink 1200ms infinite ease-in-out';
        }
      }, selector, this.highlightColor, this.highlightBorder);

      console.log(`✨ Fade Blinking: ${selector} (duration: ${duration}ms)`);
      this.highlightedElements.push(selector);

      // Stop blinking after duration
      await this.page.waitForTimeout(duration);
      await this.removeHighlight(selector);

      return true;
    } catch (error) {
      console.error(`❌ Error in highlightWithFadeBlink:`, error.message);
      return false;
    }
  }

  /**
   * Highlight multiple elements with blinking effect
   * @param {string} selector - CSS selector for multiple elements
   * @param {number} duration - Duration of blinking per element (ms)
   * @param {number} delayBetween - Delay between elements (ms)
   */
  async highlightMultipleWithBlink(selector, duration = 1000, delayBetween = 500) {
    try {
      const count = await this.page.$$eval(selector, elements => elements.length);
      console.log(`💫 Blinking ${count} elements with selector: ${selector}`);

      for (let i = 0; i < count; i++) {
        const elementSelector = `${selector}:nth-of-type(${i + 1})`;
        await this.highlightWithBlink(elementSelector, duration, 400);
        if (i < count - 1) {
          await this.page.waitForTimeout(delayBetween);
        }
      }

      return true;
    } catch (error) {
      console.error(`❌ Error highlighting multiple elements with blink:`, error.message);
      return false;
    }
  }

  /**
   * Highlight all interactive elements on page
   * @param {Array} selectors - Array of selectors to highlight
   * @param {number} delayBetween - Delay between highlights (ms)
   */
  async highlightAllInteractiveElements(
    selectors = ['button', 'a', 'input', 'select', 'textarea', '[role="button"]'],
    delayBetween = 300
  ) {
    try {
      console.log(`🌟 Highlighting all interactive elements...`);

      for (const selector of selectors) {
        const count = await this.page.$$eval(selector, elements => elements.length);
        if (count === 0) continue;

        for (let i = 0; i < count; i++) {
          const elementSelector = `${selector}:nth-of-type(${i + 1})`;
          await this.highlightElement(elementSelector, 500);

          if (i < count - 1) {
            await this.page.waitForTimeout(delayBetween);
          }
        }
      }

      console.log(`✅ All interactive elements highlighted`);
      return true;
    } catch (error) {
      console.error(`❌ Error highlighting interactive elements:`, error.message);
      return false;
    }
  }

  /**
   * Highlight element with custom style
   * @param {string} selector - CSS selector
   * @param {Object} styles - CSS styles object
   */
  async highlightWithCustomStyle(selector, styles = {}) {
    try {
      const element = await this.page.$(selector);
      if (!element) {
        console.log(`⚠️  Element not found: ${selector}`);
        return false;
      }

      // Scroll into view
      if (this.scrollIntoView) {
        await element.scrollIntoViewIfNeeded();
      }

      // Apply custom styles
      const defaultStyles = {
        backgroundColor: this.highlightColor,
        border: this.highlightBorder,
        boxShadow: `0 0 10px ${this.highlightColor}`,
        ...styles
      };

      await this.page.evaluate((sel, customStyles) => {
        const el = document.querySelector(sel);
        if (el) {
          Object.assign(el.style, customStyles);
        }
      }, selector, defaultStyles);

      console.log(`✨ Highlighted with custom style: ${selector}`);
      this.highlightedElements.push(selector);

      // Remove highlight after duration
      await this.page.waitForTimeout(this.highlightDuration);
      await this.removeHighlight(selector);

      return true;
    } catch (error) {
      console.error(`❌ Error in highlightWithCustomStyle:`, error.message);
      return false;
    }
  }

  /**
   * Remove highlight from element
   * @param {string} selector - CSS selector
   */
  async removeHighlight(selector) {
    try {
      await this.page.evaluate((sel) => {
        const el = document.querySelector(sel);
        if (el) {
          el.style.backgroundColor = '';
          el.style.border = '';
          el.style.boxShadow = '';
          el.style.animation = '';
          el.style.opacity = '1';
        }
      }, selector);

      console.log(`🔄 Removed highlight: ${selector}`);
      this.highlightedElements = this.highlightedElements.filter(s => s !== selector);
      return true;
    } catch (error) {
      console.error(`❌ Error removing highlight:`, error.message);
      return false;
    }
  }

  /**
   * Remove all highlights
   */
  async removeAllHighlights() {
    try {
      for (const selector of this.highlightedElements) {
        await this.removeHighlight(selector);
      }

      console.log(`🔄 Removed all highlights`);
      this.highlightedElements = [];
      return true;
    } catch (error) {
      console.error(`❌ Error removing all highlights:`, error.message);
      return false;
    }
  }

  /**
   * Highlight and log element information
   * @param {string} selector - CSS selector
   */
  async highlightAndLogInfo(selector) {
    try {
      const element = await this.page.$(selector);
      if (!element) {
        console.log(`⚠️  Element not found: ${selector}`);
        return false;
      }

      // Highlight element
      await this.highlightElement(selector, 1500);

      // Get element information
      const info = await this.page.evaluate((sel) => {
        const el = document.querySelector(sel);
        if (!el) return null;

        const rect = el.getBoundingClientRect();
        return {
          tagName: el.tagName,
          id: el.id || 'N/A',
          className: el.className || 'N/A',
          text: el.textContent?.substring(0, 100) || 'N/A',
          x: Math.round(rect.x),
          y: Math.round(rect.y),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          isVisible: rect.width > 0 && rect.height > 0,
          isClickable: el.onclick !== null || el.getAttribute('role') === 'button'
        };
      }, selector);

      console.log(`📊 Element Info:`, info);
      return info;
    } catch (error) {
      console.error(`❌ Error in highlightAndLogInfo:`, error.message);
      return false;
    }
  }

  /**
   * Get all highlighted elements
   */
  getHighlightedElements() {
    return [...this.highlightedElements];
  }

  /**
   * Set highlight color
   * @param {string} color - Color value (hex, rgb, etc.)
   */
  setHighlightColor(color) {
    this.highlightColor = color;
    console.log(`🎨 Highlight color changed to: ${color}`);
  }

  /**
   * Set highlight duration
   * @param {number} duration - Duration in milliseconds
   */
  setHighlightDuration(duration) {
    this.highlightDuration = duration;
    console.log(`⏱️  Highlight duration changed to: ${duration}ms`);
  }
}

module.exports = ElementHighlighter;
