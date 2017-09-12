class Scene {
  constructor(data) {

  }

  text() {

  }
}

class Story {
  constructor(scenes) {
    this.scenes = scenes.map(scene =>
      return new Scene
    )
  }
}

export default Story;
