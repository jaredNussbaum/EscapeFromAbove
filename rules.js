class Start extends Scene {


    create() {
        this.engine.setTitle(this.engine.storyData["Title"]); 
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData["InitialLocation"]);
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData["Locations"][key]; 
        this.engine.show(locationData["Body"]); 
        
        if(locationData["Choices"] != undefined) { 
            for(let choice of locationData["Choices"]) { 
                this.engine.addChoice(choice["Text"], choice); 
            }
        } else {
            this.engine.addChoice("The end.")



        }
    }

    handleChoice(choice) {
        if(choice) {
            //if (choice.Target)
            if (choice.Target == "Room4" & this.engine.storyData.hasID != "N"){
                this.engine.show("&gt; "+choice.Text);
                this.engine.gotoScene(Location, "GrabID");
            }
            else if (choice.Text == "Take your ID card and return to the Control room."){
                this.engine.storyData.hasID = "N"
                this.engine.show("&gt; "+choice.Text);
                this.engine.gotoScene(Location, choice.Target);
            }
            else{
                this.engine.show("&gt; "+choice.Text);
                this.engine.gotoScene(Location, choice.Target);
            }
 
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');


