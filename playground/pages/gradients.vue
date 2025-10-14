<template>
  <div class="space-y-8">
    <h2 class="text-3xl font-bold text-gray-900">Gradients NxPay</h2>

    <section>
      <h3 class="text-xl font-semibold text-gray-900 mb-4">Gradient Signature</h3>
      <div class="h-64 gradient-nxpay rounded-2xl flex items-center justify-center text-white">
        <div class="text-center">
          <p class="text-4xl font-bold mb-2">NxPay</p>
          <p class="text-lg opacity-90">Gradient 135deg</p>
        </div>
      </div>
      <code class="block mt-2 text-xs text-gray-600">
        linear-gradient(135deg, #77F07F 0%, #3FC995 50%, #40A0AE 100%)
      </code>
    </section>

    <section>
      <h3 class="text-xl font-semibold text-gray-900 mb-4">Gradient Vertical</h3>
      <div
        class="h-64 gradient-nxpay-vertical rounded-2xl flex items-center justify-center text-white"
      >
        <div class="text-center">
          <p class="text-4xl font-bold mb-2">NxPay</p>
          <p class="text-lg opacity-90">Gradient 180deg</p>
        </div>
      </div>
      <code class="block mt-2 text-xs text-gray-600">
        linear-gradient(180deg, #77F07F 0%, #3FC995 100%)
      </code>
    </section>

    <section>
      <h3 class="text-xl font-semibold text-gray-900 mb-4">Gradients Personnalisés</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div
            class="h-48 rounded-2xl flex items-center justify-center text-white"
            style="background: linear-gradient(90deg, #77f07f 0%, #3fc995 100%)"
          >
            <p class="text-lg font-semibold">Horizontal</p>
          </div>
          <code class="block mt-2 text-xs text-gray-600"> 90deg, #77F07F → #3FC995 </code>
        </div>

        <div>
          <div
            class="h-48 rounded-2xl flex items-center justify-center text-white"
            style="background: linear-gradient(45deg, #77f07f 0%, #40a0ae 100%)"
          >
            <p class="text-lg font-semibold">Diagonal 45deg</p>
          </div>
          <code class="block mt-2 text-xs text-gray-600"> 45deg, #77F07F → #40A0AE </code>
        </div>

        <div>
          <div
            class="h-48 rounded-2xl flex items-center justify-center text-white"
            style="background: linear-gradient(135deg, #3fc995 0%, #37669c 100%)"
          >
            <p class="text-lg font-semibold">Teal to Blue</p>
          </div>
          <code class="block mt-2 text-xs text-gray-600"> 135deg, #3FC995 → #37669C </code>
        </div>

        <div>
          <div
            class="h-48 rounded-2xl flex items-center justify-center text-white"
            style="background: linear-gradient(135deg, #40a0ae 0%, #3a2f6b 100%)"
          >
            <p class="text-lg font-semibold">Turquoise to Purple</p>
          </div>
          <code class="block mt-2 text-xs text-gray-600"> 135deg, #40A0AE → #3A2F6B </code>
        </div>
      </div>
    </section>

    <section>
      <h3 class="text-xl font-semibold text-gray-900 mb-4">Gradient 5 Couleurs</h3>
      <div
        class="h-64 rounded-2xl flex items-center justify-center text-white"
        style="
          background: linear-gradient(
            135deg,
            #77f07f 0%,
            #3fc995 25%,
            #40a0ae 50%,
            #37669c 75%,
            #3a2f6b 100%
          );
        "
      >
        <div class="text-center">
          <p class="text-4xl font-bold mb-2">NxPay Full Spectrum</p>
          <p class="text-lg opacity-90">Toutes les 5 couleurs</p>
        </div>
      </div>
      <code class="block mt-2 text-xs text-gray-600">
        linear-gradient(135deg, #77F07F 0%, #3FC995 25%, #40A0AE 50%, #37669C 75%, #3A2F6B 100%)
      </code>
    </section>

    <section>
      <h3 class="text-xl font-semibold text-gray-900 mb-4">Gradients avec Transparence</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          class="h-48 rounded-2xl flex items-center justify-center text-gray-900 border border-gray-200"
          style="
            background: linear-gradient(
              135deg,
              rgba(119, 240, 127, 0.2) 0%,
              rgba(63, 201, 149, 0.2) 100%
            );
          "
        >
          <p class="text-lg font-semibold">20% Opacity</p>
        </div>

        <div
          class="h-48 rounded-2xl flex items-center justify-center text-white"
          style="
            background: linear-gradient(
              135deg,
              rgba(119, 240, 127, 0.8) 0%,
              rgba(63, 201, 149, 0.8) 100%
            );
          "
        >
          <p class="text-lg font-semibold">80% Opacity</p>
        </div>
      </div>
    </section>

    <section>
      <h3 class="text-xl font-semibold text-gray-900 mb-4">Usage dans les Composants</h3>
      <div class="bg-white p-6 rounded-xl border border-gray-200">
        <pre class="text-sm"><code>&lt;div class="gradient-nxpay rounded-2xl p-6 text-white"&gt;
  &lt;h3&gt;Card avec Gradient&lt;/h3&gt;
&lt;/div&gt;

&lt;div class="bg-gradient-to-r from-nxGreen-500 to-nxTeal-500"&gt;
  Gradient Tailwind
&lt;/div&gt;</code></pre>
      </div>
    </section>
  </div>
</template>
