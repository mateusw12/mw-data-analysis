import "./style.css";
import Paper from "@mui/material/Paper";

const About = () => {
  return (
    <>
      <div className="about">
        <div className="about-container">
          <div className="text">
            <h1>Bem-vindo ao MW Data Analysis</h1>

            <p>
              O <strong>MW Data Analysis</strong> é uma poderosa ferramenta
              projetada para análise de dados avançada e visualização intuitiva.
              Com três módulos distintos - Análise, Dashboards e Geoanálise - e
              planos emocionantes para um futuro módulo Estatístico, estamos
              moldando o cenário da análise de dados de maneira inovadora.
            </p>

            <h2>Módulo de Análise</h2>

            <h3>Tabelas Dinâmicas</h3>
            <p>
              No módulo de Análise, oferecemos uma abordagem flexível. Importe
              seus dados a partir de arquivos Excel ou CSV, e mergulhe em
              análises profundas. Destacamos recursos como:
            </p>

            <ul>
              <li>
                <strong>Coloração de Evolução:</strong> Visualize mudanças ao
                longo do tempo com cores dinâmicas.
              </li>
              <li>
                <strong>Faixa de Atingimento:</strong> Configure faixas para
                identificar valores conform os limites desejados.
              </li>
              <li>
                <strong>Coloração Personalizada:</strong> Atribua cores
                específicas a valores de interesse.
              </li>
              <li>
                <strong>Relevância:</strong> Destaque automaticamente valores
                relevantes para tomadas de decisão mais rápidas.
              </li>
              <li>
                <strong>Filtros Personalizados:</strong> Explore dados
                facilmente filtrando por valores específicos.
              </li>
              <li>
                <strong>Gráficos Integrados:</strong> Crie gráficos de barra,
                linha ou bolha diretamente dos dados da tabela.
              </li>
            </ul>

            <h3>Consulta de Análises</h3>
            <p>
              Acesse a tela de Consulta para revisitar e comparar análises
              anteriores. Toda a flexibilidade ao seu alcance.
            </p>

            <h2>Módulo de Dashboards</h2>

            <h3>Visualização Dinâmica</h3>
            <p>
              Crie dashboards impactantes e responsivos usando o módulo de
              Dashboards. Destaques incluem:
            </p>

            <ul>
              <li>
                <strong>Layout Responsivo:</strong> Utilize o melhor layout
                responsivo para ajustar seus gráficos automaticamente.
              </li>
              <li>
                <strong>Filtros Integrados:</strong> Mantenha a interatividade
                ao filtrar dados diretamente no dashboard.
              </li>
              <li>
                <strong>Estilização:</strong> Estilize seus dashboard com cores
                únicas conforme o desejado.
              </li>
              <li>
                <strong>Exportação:</strong> Baixe qualquer dashboard e tenha-os
                para qualquer utilização.
              </li>
            </ul>

            <h2>Módulo de Geoanálise</h2>

            <h3>Exploração Geográfica</h3>
            <p>
              No módulo de Geoanálise, leve seus dados para o mapa mundial.
              Destaque países, regiões e estados usando o poderoso Google Maps.
            </p>

            <h2>Futuro Módulo Estatístico</h2>

            <h3>Ferramentas Avançadas</h3>
            <p>
              Em breve, lançaremos um módulo Estatístico, oferecendo ferramentas
              como Monte Carlo, DOE, Regressão Múltipla, Regressão Simples e
              muito mais.
            </p>

            <p>
              No <strong>MW Data Analysis</strong>, capacitamos você a
              transformar dados em insights significativos. Explore, visualize e
              descubra o potencial oculto em seus conjuntos de dados. Estamos
              ansiosos para guiá-lo em sua jornada analítica!
            </p>
          </div>
          <div className="images">
            <Paper elevation={6} style={{ marginBottom: 30, height: "400px" }}>
              <img
                style={{
                  width: "100%",
                  height: "100%",
                }}
                src="/assets/pages/loog.png"
                alt="Logo tipo"
              />
            </Paper>
            <Paper elevation={6} style={{ marginBottom: 30, height: "400px" }}>
              <img
                src="/assets/pages/analitycs.png"
                style={{
                  width: "100%",
                  height: "100%",
                }}
                alt="Descrição da Imagem 1"
              />
            </Paper>
            <Paper elevation={6} style={{ marginBottom: 30, height: "400px" }}>
              <img
                style={{
                  width: "100%",
                  height: "100%",
                }}
                src="/public/assets/pages/dashboards.webp"
                alt="Descrição da Imagem 2"
              />
            </Paper>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
