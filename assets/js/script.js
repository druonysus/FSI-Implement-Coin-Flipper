
/*
 * pennyPage Object to collect all the page elements
*/
let pennyPage = {
    image: document.querySelector("#penny-image"),
    banner: document.querySelector("#message"),
    scoreBoard: {
        numberOfHeads: document.querySelector("#heads"),
        percentageHeads: document.querySelector("#heads-percent"),
        numberOfTails: document.querySelector("#tails"),
        percentageTails: document.querySelector("#tails-percent"),
        totalFlips: document.querySelector("#total-flips")
    },
    update: function() {
        // update the image on the page
        this.image.src = penny.imageSource
        // update the banner text
        this.banner.textContent = scoreBoard.banner

        // update the scoreboard values
        this.scoreBoard.numberOfHeads.textContent = scoreBoard.numberOfHeads
        this.scoreBoard.numberOfTails.textContent = scoreBoard.numberOfTails
        this.scoreBoard.percentageHeads.textContent = scoreBoard.percentageHeads + "%"
        this.scoreBoard.percentageTails.textContent = scoreBoard.percentageTails + "%"
        this.scoreBoard.totalFlips.textContent = scoreBoard.totalFlips
    },
    buttons: {
        flip: document.querySelector("#flip").addEventListener('click', function() {
            // flip the penny and update the page
            penny.flip()
            pennyPage.update()
        }),
        clear: document.querySelector("#clear").addEventListener('click', function() {
            // clear the scoreboard and update the page
            scoreBoard.reset()
            pennyPage.update()
        })
    },
    onLoad: document.addEventListener('DOMContentLoaded', function() {
        // set img src and message on page load
        pennyPage.image.src = penny.imageSource
    })
}

/*
 * scoreBoard object to define all the counters
*/
let scoreBoard = {
    banner: "Let's Get Flippin'!",
    numberOfTails: 0,
    numberOfHeads: 0,
    percentageHeads: 0,
    percentageTails: 0,
    totalFlips: 0,
    calculatePercentage: function() {
       this.percentageHeads = Math.round((this.numberOfHeads / penny.totalFlips ) * 100) || 0
       this.percentageTails = Math.round((this.numberOfTails / penny.totalFlips ) * 100) || 0
    },
    update: function() {
        // observe the penny's state and update the scoreboard
        this.numberOfTails = penny.tailsCount
        this.numberOfHeads = penny.headsCount
        this.totalFlips    = penny.totalFlips
        this.banner = (penny.sideUp == null) 
                    ? "Let's Get Flippin'!" 
                    : `You Flipped ${penny.sideUp.toUpperCase()}!`
        
        this.calculatePercentage()
        pennyPage.image.src = penny.imageSour
    },
    reset: function() {
        // if you reset the board, you're really resetting
        // the state of the penny.
        penny.reset()
    }
}

/*
 * penny object is the athority for its state
*/
let penny = {
    sides: ["heads", "tails"],
    sideUp: null,
    headsCount: 0,
    tailsCount: 0,
    totalFlips: 0,
    imageSource: "assets/images/penny-heads.jpg",
    flip: function() {
        let result_bool = Math.random() < 0.5
        this.sideUp = this.sides[Number(result_bool)]
        this.imageSource = `assets/images/penny-${this.sideUp}.jpg`
        this.totalFlips++
        
        eval(`this.${this.sideUp}Count++`)
        scoreBoard.update()
    },
    reset: function() {
        this.sideUp = null
        this.headsCount=this.tailsCount=this.totalFlips=0
        scoreBoard.update()
    }
}