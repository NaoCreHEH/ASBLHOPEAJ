import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Mission() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-purple-blue text-white py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            L'Espoir
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Redonner espoir et construire un avenir sans harcèlement.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="flex justify-center">
              <div className="w-full max-w-sm">
                <div className="text-9xl text-center">🌻</div>
                <p className="text-center text-xl font-semibold text-hope-purple mt-4">
                  HOPE Action Jeunesse
                </p>
              </div>
            </div>
            <div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                HOPE, c'est l'espoir. L'espoir de continuer même quand tout
                semble s'effondrer. Cet espoir qui nous pousse à avancer, à
                garder le sourire même dans les pires moments. C'est cette
                petite flamme qui brûle en nous, qui nous fait croire en un
                avenir meilleur, même quand le présent est sombre.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                HOPE, c'est aussi la force de continuer quand plus personne ne
                croit en nous, de persévérer quand le monde semble nous tourner
                le dos. Ce n'est pas juste un mot, c'est une manière de penser,
                une philosophie de vie. C'est ce qui nous rappelle que tant
                qu'il y a de l'espoir, tout est encore possible.
              </p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-hope-purple mb-6">
              L'histoire du fondateur
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Il était une fois un jeune garçon, timide et doté d'une maturité
              inhabituelle pour son âge. Cette différence, au lieu d'être une
              force reconnue, lui a souvent valu d'être isolé par ses camarades
              à l'école. Malgré les remarques et la solitude, il n'a jamais
              laissé ces épreuves l'abattre. Au contraire, il a nourri son
              imagination et a développé des idées pour améliorer le monde
              autour de lui. Trop jeune pour les mettre en œuvre, il les a
              précieusement gardées en tête, sachant que leur moment viendrait.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              En grandissant, ce garçon est devenu un jeune homme déterminé à
              changer les choses, particulièrement dans le domaine de
              l'éducation. Il a commencé par de petites actions locales,
              jusqu'à ce qu'un de ses professeurs reconnaisse son potentiel et
              l'encourage à aller plus loin. Cela l'a conduit à créer son ASBL,
              entouré d'une équipe motivée et d'un entourage qui croyait en
              lui.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Aujourd'hui, il est fier d'avoir transformé son parcours
              difficile en une mission : aider les jeunes en difficulté, les
              sortir de l'isolement, et leur redonner le sourire. Grâce à son
              travail et à son engagement, il prouve que la différence peut
              être une véritable force.
            </p>
            <p className="text-xl font-semibold text-hope-purple mt-8 italic">
              Cette histoire vous en doutez, c'est la mienne, celle du
              fondateur de Hope Action Jeunesse.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
