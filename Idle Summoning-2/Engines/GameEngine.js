class GameEngine {
     constructor(myGame, ctx) {
          this.kFPS = 60
          this.kMPF = 1000 / this.kFPS//milliseconds per frame

          this.mPreviousTime;
          this.mLagTime;
          this.mCurrentTime;
          this.mElapsedTime;

          this.mIsLoopRunning = false;
          this.input = new InputEngine()

          this.myGame = myGame;
          this.ctx = ctx
     }
     init() {

          this.mPreviousTime = Date.now()
          this.mLagTime = 0;
          this.mIsLoopRunning = true

          this.fpsElement = document.getElementById('fps-value');
          this.fpsElement.hidden = true
          document.getElementById('fps-display').hidden = true
          this.framesThisSecond = 0;
          this.lastFPSUpdate = 0;
          this.updateInterval = 1000;


          this.runLoop()
     }

     runLoop() {
          const stepFn = () => {
               if (this.mIsLoopRunning) {

                    this.mCurrentTime = Date.now()
                    this.mElapsedTime = this.mCurrentTime - this.mPreviousTime
                    this.mPreviousTime = this.mCurrentTime
                    this.mLagTime += this.mElapsedTime

                    if (this.mLagTime > 1000) {
                         this.mLagTime = 0;
                    }

                    //console.log("Current lag is ", this.mLagTime)
                    while ((this.mLagTime >= this.kMPF) && this.mIsLoopRunning) {
                         this.update()
                         this.mLagTime -= this.kMPF
                    }
                    this.draw()

                    this.updateFPS()
                    this.framesThisSecond++
                    requestAnimationFrame(stepFn)
               }
          }
          stepFn()
     }

     updateFPS() {
          const currentTime = Date.now();
          if (currentTime - this.lastFPSUpdate > this.updateInterval) {
               const fps = this.framesThisSecond;
               this.fpsElement.textContent = fps;
               this.framesThisSecond = 0;
               this.lastFPSUpdate = currentTime;
          }
     }

     update() {
          this.input.update()
          this.myGame.update(this)
     }
     draw() {
          this.myGame.draw(this.ctx)
     }
}