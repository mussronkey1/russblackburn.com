const reduceMotion =
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const revealItems =
  document.querySelectorAll(
    ".case-study > section, .case-feature-grid article, .case-evidence-grid article, .case-outcomes article, .case-dashboard__grid article"
  );

if (revealItems.length) {
  revealItems.forEach((item) => {
    item.classList.add("case-reveal");
  });
}

if (!reduceMotion && "IntersectionObserver" in window) {
  const revealObserver =
    new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, {
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.12
    });

  revealItems.forEach((item) => {
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => {
    item.classList.add("is-visible");
  });
}

const metricItems =
  document.querySelectorAll("[data-count-up]");

const formatMetric = (element, value) => {
  const decimals =
    Number(element.dataset.decimals || 0);

  const prefix =
    element.dataset.prefix || "";

  const suffix =
    element.dataset.suffix || "";

  return `${prefix}${value.toFixed(decimals)}${suffix}`;
};

const animateMetric = (element) => {
  const target =
    Number(element.dataset.target);

  if (!Number.isFinite(target)) {
    return;
  }

  if (reduceMotion) {
    element.textContent = formatMetric(element, target);
    return;
  }

  const duration = 900;
  const start = performance.now();

  const tick = (now) => {
    const progress =
      Math.min((now - start) / duration, 1);

    const eased =
      1 - Math.pow(1 - progress, 3);

    element.textContent =
      formatMetric(element, target * eased);

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);
};

if (metricItems.length && "IntersectionObserver" in window) {
  const metricObserver =
    new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        animateMetric(entry.target);
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.7
    });

  metricItems.forEach((item) => {
    metricObserver.observe(item);
  });
} else {
  metricItems.forEach(animateMetric);
}

const architecture =
  document.querySelector("[data-architecture-diagram]");

const mapCopy = {
  intent: {
    label: "Intent",
    title: "Customers were not casually browsing. They were starting real provisioning workflows.",
    body: "The funnel showed strong activation intent before the experience crossed into identity, marketplace, and permission systems."
  },
  sso: {
    label: "SSO",
    title: "Authentication succeeded, but the journey still carried hidden downstream dependencies.",
    body: "Users returned from Red Hat SSO with momentum, only to encounter the complexity of enterprise cloud marketplace activation."
  },
  provisioning: {
    label: "Provisioning",
    title: "The marketplace handoff exposed a gap between product intent and operational readiness.",
    body: "Provisioning began, telemetry spiked, and the experience revealed where system design was silently converting qualified demand into failure."
  },
  barrier: {
    label: "Barrier",
    title: "The hidden IAM requirement became the decisive failure point.",
    body: "Enterprise users needed elevated AWS IAM administrative privileges that were rarely available to the evaluator completing the trial workflow."
  },
  subscription: {
    label: "Target",
    title: "The redesigned journey made completion, routing, and recovery visible.",
    body: "The future-state experience clarified eligibility, routed users by context, and gave teams better signals for activation support and sales follow-up."
  }
};

if (architecture) {
  const controls =
    architecture.querySelectorAll("[data-map-step]");

  const nodes =
    architecture.querySelectorAll("[data-map-node]");

  const panel =
    architecture.querySelector("#map-panel");

  const setActiveStep = (step) => {
    const content =
      mapCopy[step] || mapCopy.intent;

    architecture.dataset.activeStep = step;

    controls.forEach((control) => {
      const isActive =
        control.dataset.mapStep === step;

      control.classList.toggle("is-active", isActive);
      control.setAttribute("aria-selected", String(isActive));
      control.tabIndex = isActive ? 0 : -1;
    });

    nodes.forEach((node) => {
      node.classList.toggle(
        "is-active",
        node.dataset.mapNode === step
      );
    });

    if (panel) {
      panel.innerHTML =
        `<p class="case-architecture__label">${content.label}</p>` +
        `<h3>${content.title}</h3>` +
        `<p>${content.body}</p>`;
    }
  };

  controls.forEach((control) => {
    control.addEventListener("click", () => {
      setActiveStep(control.dataset.mapStep);
    });

    control.addEventListener("keydown", (event) => {
      const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];

      if (!keys.includes(event.key)) {
        return;
      }

      event.preventDefault();

      const controlsArray =
        Array.from(controls);

      const currentIndex =
        controlsArray.indexOf(control);

      let nextIndex = currentIndex;

      if (event.key === "ArrowRight") {
        nextIndex = (currentIndex + 1) % controlsArray.length;
      }

      if (event.key === "ArrowLeft") {
        nextIndex =
          (currentIndex - 1 + controlsArray.length) %
          controlsArray.length;
      }

      if (event.key === "Home") {
        nextIndex = 0;
      }

      if (event.key === "End") {
        nextIndex = controlsArray.length - 1;
      }

      controlsArray[nextIndex].focus();
      setActiveStep(controlsArray[nextIndex].dataset.mapStep);
    });
  });

  nodes.forEach((node) => {
    node.addEventListener("click", () => {
      setActiveStep(node.dataset.mapNode);
    });

    node.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }

      event.preventDefault();
      setActiveStep(node.dataset.mapNode);
    });
  });

  setActiveStep("intent");
}
