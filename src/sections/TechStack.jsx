import TitleHeader from "../components/TitleHeader"
import { techStackImgs } from "../constants"

const TechStack = () => {
  return (
    <div id="skills" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="My Preferred Tech Stack"
          sub="🤝 The Skills I Bring To The Table"
        />

        <div className="tech-grid">
          {techStackImgs.map((icon) => (
            <div
              key={icon.name}
              className="card-border tech-card overflow-hidden group xl:rounded-full rounded-lg"
            >
              <div className="tech-card-animated-bg" />

              <div className="tech-card-content">
                {/* IMAGE INSTEAD OF 3D */}
                <div className="tech-icon-wrapper flex-center">
                  <img
                    src={icon.imgPath}
                    alt={icon.name}
                    className={`w-30 h-30 object-contain ${
                    icon.size}`}
                  />
                </div>

                <div className="padding-x w-full">
                  <p>{icon.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TechStack