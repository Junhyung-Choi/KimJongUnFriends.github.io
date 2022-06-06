let img
let page
let _pcircleh = 1850;
let pcirclesize = 50;
let pcirclesizeup = 75;
let easing = 0.5;
let csize1 = 50;
let csize2 = 50;
let csize3 = 50;
let year = 2012
let isChangingYear = false
let statue_pos = 1920;
let friendimgsize = 80;
let isIncreasing = false;
let data = {};
let friendimg = {};
let kortoeng = {"김정은":"kje",
                "최룡해": "cyh",
                "황병서": "hbs",
                "조용원": "jyw",
                "마원춘": "mwc",
                "장성택": "jst",
                "리영길": "lyg",
                "김기남": "kkn",
                "박정천": "bjc",
                "박봉주": "bbj",
                "리병철": "lbc",
                "한광상": "hgs",
                "리설주": "lsj",
                "최태복": "ctb",
                "김양건": "kyg",
                "오수용": "osy",
                "김영철": "kyc",
                "박태성": "bts",
                "김평해": "kph",
                "김여정": "kyj"};
let yearimg = [];
let chosen = "";
let choseninfo = "";
let chosencount = "";
let chosenyear = 0;
let chosenPerson = "";
let isDrawingInformation = false;
let totalPersons = []
let p2Percent = 0;
let planets = [];
let mouselock = "";

function preload()
{
    data = loadJSON('data.json');
    kje = loadImage('src/img/kje.png');
    friendimg["김정은"] = kje;
};

function setup() {
    _pcircleh = displayWidth - 100;
    createCanvas(displayWidth - 20, 900);
    img = loadImage('src/img/running-man.gif');
    statue_img = loadImage('src/img/statue.png');
    for(var name in data['total-friend'])
    {
        let eName = "";
        if (kortoeng.hasOwnProperty(name))
            eName = kortoeng[name];
        else
            eName = "default";
        friendimg[name] = loadImage('src/img/' + eName + '.png');
    }
    page = 3
    updateYearImg();
    tdata = data['total-friend']
    let cnt = 0;
    for (i in tdata){
        cnt++
        if (cnt > 19) break;
        let name = i;
        totalPersons.push(new Person(i))
        planets.push(new Planet(name,data['total-friend'][name]/3));
    }
    textStyle(BOLD);
    textSize(20);
    buttons = []
    buttons.push(new Button(100,200,1,"연도별 통계 보기"));
    buttons.push(new Button(100,300,2,"전체 통계 보기"));
};

function draw() {
    drawBasic();
    if(page == 1) page1();
    else if(page == 2) page2();
    else if(page == 3) page3();
}

function drawBasic()
{
    background(220);
    let d1 = dist(mouseX, mouseY, _pcircleh, 50);
    let d2 = dist(mouseX, mouseY, _pcircleh, 150);
    let d3 = dist(mouseX, mouseY, _pcircleh, 250);
    if(d1 <= pcirclesize){
        let dsize1 = pcirclesizeup - csize1;
        csize1 += dsize1 * easing;
        let dsize2 = csize2 - pcirclesize;
        csize2 -= dsize2 * easing;
        let dsize3 = csize3 - pcirclesize;
        csize3 -= dsize3 * easing;
        circle(_pcircleh,50,csize1);
        circle(_pcircleh,150,csize2);
        circle(_pcircleh,250,csize3);    
    }
    else if(d2 <= pcirclesize) {
        let dsize1 = csize1 - pcirclesize;
        csize1 -= dsize1 * easing;
        let dsize2 = pcirclesizeup - csize2;
        csize2 += dsize2 * easing;
        let dsize3 = csize3 - pcirclesize;
        csize3 -= dsize3 * easing;
        circle(_pcircleh,50,csize1);
        circle(_pcircleh,150,csize2);
        circle(_pcircleh,250,csize3);
    }
    else if(d3 <= pcirclesize){
        let dsize1 = csize1 - pcirclesize;
        csize1 -= dsize1 * easing;
        let dsize2 = csize2 - pcirclesize;
        csize2 -= dsize2 * easing;
        let dsize3 = pcirclesizeup - csize3;
        csize3 += dsize3 * easing;
        circle(_pcircleh,50,csize1);
        circle(_pcircleh,150,csize2);
        circle(_pcircleh,250,csize3);
    }
    else{
        let dsize1 = csize1 - pcirclesize;
        csize1 -= dsize1 * easing;
        let dsize2 = csize2 - pcirclesize;
        csize2 -= dsize2 * easing;
        let dsize3 = csize3 - pcirclesize;
        csize3 -= dsize3 * easing;
        circle(_pcircleh,50,csize1);
        circle(_pcircleh,150,csize2);
        circle(_pcircleh,250,csize3);
    } 
    fill(0, 0, 0);
    text("연별",_pcircleh-17,50+8);
    text("전체",_pcircleh-17,150+8);
    text("시작",_pcircleh-17,250+8);
    fill(255, 255, 255);
}

function page1(){
    drawStatue();
    drawYear();
    drawLand();
    checkMouseHover();
    image(img, 1200, 170, img.width, img.height);
    image(kje, 1400, 170, 160,160);
    for(i = 0;i < 5; i++)
    {
        image(img, 1200 - 200 * (i+1), 400, img.width/2, img.height/2);
    }
    if(isChangingYear)
    {
        if(isIncreasing)
        {
            friendimgsize += easing * 10;
            for(i = 0 ; i < 5; i++)
            {
                image(yearimg[i],1300 - 200 * (i+1), 400, friendimgsize, friendimgsize);
            }
            if(friendimgsize >= 80)
            {
                friendimgsize = 80;
                isIncreasing = false;
            }
        } 
        else 
        {
            friendimgsize -= easing * 10;
            if(friendimgsize < 0.5) isIncreasing = true;
            else
                for(i = 0 ; i < 5; i++)
                {
                    image(yearimg[i],1300 - 200 * (i+1), 400, friendimgsize, friendimgsize);
                }
        }
        // 다 줄었는지
        if(friendimgsize < 1)
        {
            updateYearImg();
        }
        // 다 끝났는지
        if(friendimgsize == 80)
        {
            isChangingYear = false;
        }
    } else {
        for(i = 0;i < 5; i++)
        {
            image(yearimg[i],1300 - 200 * (i+1), 400, friendimgsize, friendimgsize);
        }
    }
    if(isDrawingInformation)
    {
        fill(0, 0, 0);
        textSize(50);
        text(chosen,100,700);
        textSize(35);
        text(chosenyear + "년도 수행 횟수: " + chosencount,240,700);
        textSize(20);
        text(choseninfo.replaceAll(". ",".\n"),100,750);
        fill(255, 255, 255);
    }
}

function checkMouseHover()
{
    for(i = 0;i < 5; i++)
    {
        let startX = 1300 - 200 * (i+1);
        let startY = 400;
        if( startX <= mouseX && mouseX <= startX + 100 && startY < mouseY && mouseY < startY + img.height/2)
        {
            rect(startX-50, 620, 150,20);
        }
    }
}

function page2() {
    for(i = 0; i < 19; i++)
    {
        rect(1200 - 60 * i,800 - totalPersons[i].totaldata * p2Percent/100,50,totalPersons[i].totaldata * p2Percent/100);
        totalPersons[i].draw(1200 - 60 * i,800 - totalPersons[i].totaldata * p2Percent/100);
    }
    p2Percent += 1
    if (p2Percent > 100) p2Percent = 100;

    if(isDrawingInformation)
    {
        image(friendimg[chosenPerson.name],100,50,200,200);
        fill(0, 0, 0)
        textSize(50);
        text(chosenPerson.name,320,100);
        textSize(35);
        text("총 수행한 횟수: " + chosenPerson.totaldata, 320, 150);
        textSize(15);
        text(choseninfo.replaceAll(". ",".\n"),320,180);
        textSize(20);
        fill(255, 255, 255);
    }
}

function page3() {
    for(i = 0; i < 2; i++)
    {
        buttons[i].draw();
    }
    for(i = 0; i < 19; i++)
    {
        planets[i].draw();
    }
    kje = friendimg["김정은"];
    image(kje,displayWidth / 2 - 300 / 2, 200,300,300);
    fill(0, 0, 0);
    textSize(50);
    text("김정은 수행원 통계",100,100);
    textSize(20);
    fill(255, 255, 255);
}


function mousePressed() {
    let d1 = dist(mouseX, mouseY, _pcircleh, 50);
    let d2 = dist(mouseX, mouseY, _pcircleh, 150);
    let d3 = dist(mouseX, mouseY, _pcircleh, 250);
    if(d1 <= pcirclesize){
        page = 1;
        isDrawingInformation = false;
    }
    if(d2 <= pcirclesize){
        page = 2;
        p2Percent = 0;
        isDrawingInformation = false;
    }
    if(d3 <= pcirclesize) page = 3;
    if(page == 1)
    {
        for(i = 0;i < 5; i++)
        {
            let startX = 1300 - 200 * (i+1);
            let startY = 400;
            if( startX <= mouseX && mouseX <= startX + 100 && startY < mouseY && mouseY < startY + img.height/2)
            {
                drawInformation(startX);
                break;
            } else {
                isDrawingInformation = false;
            }
        }
    }

    if(page == 2)
    {
        for(i = 0 ; i < 19; i++)
        {
            totalPersons[i].clickCheck()
        }
    }

    if(page == 3)
    {
        for(i = 0; i < 2; i++)
        {
            buttons[i].movePage();
        }
    }
}

function mouseDragged(){
    for(i = 0; i < 19; i++)
    {
        planets[i].mouseClicked();
    }
}

function mouseReleased() {
    mouselock = "";
}

function drawInformation(startX){
    // 1100,900,700,500,300
    // 1000 800 600 400 200
    // 5 4 3 2 1
    // 0 1 2 3 4
    // 1 2 3 4 5
    let msg = "정보 없음";
    let index = (5 - ((startX - 100)/200)) + 1
    let cnt = 0;
    let name = ""
    let number = 0;
    for (var person in data['year-friend'][year])
    {
        cnt++
        if(cnt == index) {
            name = person;
            number = data['year-friend'][year][name];
            break;
        }
    }
    if (data['person-info'].hasOwnProperty(name)) msg = data['person-info'][person];
    chosen = name;
    choseninfo = msg;
    chosencount = number;
    chosenyear = year;
    isDrawingInformation = true;
}

function keyPressed(){
    if (keyCode === RIGHT_ARROW)
    {
        if(year < 2022)
            year += 1;
            isChangingYear = true;
    }
    if (keyCode === LEFT_ARROW)
    {
        if(year > 2012)
            year -= 1;
            isChangingYear = true;
    }
}

function updateYearImg()
{
    yearimg = [];
    yeardata = data["year-friend"][year.toString()];
    let cnt = 0;
    for(var people in yeardata)
    {
        yearimg.push(friendimg[people])
        if(cnt > 4) break;
    }
}

function drawStatue(){
    statue_pos -= 5
    if (statue_pos < - 500) statue_pos = 1920
    image(statue_img, statue_pos,380,statue_img.width/2,statue_img.height/2)
}

function drawYear(){
    fill(0, 0, 0);
    textStyle(BOLD);
    textSize(50);
    text(year, displayWidth/2 - 50, 100);
    textSize(20);
    text("키보드 방향키를 이용해 연도를 바꿔보세요!",100,100);
    text("알고 싶은 사람을 클릭해보세요",25, displayHeight - 200);
    fill(255, 255, 255);
}

function drawLand(){
    fill(color(30, 100));
    rect(0,620,displayWidth-20,500);
    fill(color(255,255));
}

class Person {
    constructor(name)
    {
        this.name = name;

        this.imgname = "default";
        if (kortoeng.hasOwnProperty(name))
            this.imgname = kortoeng[name];
        
        this.yeardata = {
            "2012":0,
            "2013":0,
            "2014":0,
            "2015":0,
            "2016":0,
            "2017":0,
            "2018":0,
            "2019":0,
            "2020":0,
            "2021":0,
            "2022":0
        };
        
        for(i = 2012; i < 2023; i++)
        {
            if (data['year-friend'].hasOwnProperty(name)) this.yeardata[i.toString()] = data['year-friend'][name];
        }

        this.totaldata = 0;
        this.totaldata = data['total-friend'][name];
        this.x = 0;
        this.y = 0;
    };
    
    draw(posX,posY)
    {
        let pPosX = posX + 15;
        let pPosY = posY - 90;
        image(img,posX-20,posY-90,img.width/5,img.height/5);
        image(friendimg[this.name], pPosX, pPosY, 40, 40);
        this.x = posX;
        this.y = posY;
    };

    clickCheck()
    {
        if(this.x < mouseX && mouseX < this.x + 70){
            print(this.name);
            chosen = this.name;
            chosencount = this.totaldata;
            choseninfo = data['person-info'][this.name];
            chosenPerson = this;
            isDrawingInformation = true;
        }
    };
}

class Button {
    constructor(x,y,pnum,s)
    {
        this.x = x;
        this.y = y;
        this.pnum = pnum;
        this.s = s;
    }
    draw()
    {
        rect(this.x,this.y,200,50,20);
        fill(0, 0, 0);
        text(this.s,this.x+40,this.y+35);
        fill(255, 255, 255);
    }

    movePage()
    {
        if(this.x < mouseX && mouseX < this.x + 200 && this.y < mouseY && mouseY < this.y + 50){
            print("hi");
            page = this.pnum;
        }
    }
}

class Planet{
    constructor(name,size)
    {
        this.name = name;
        this.x = random(200,displayWidth-200);
        this.y = random(200,displayHeight-200);
        let d = dist(displayWidth/2, 450, this.x, this.y);
        while (d < 350 || d > 400)
        { 
            this.x = random(200,displayWidth-200);
            this.y = random(10,displayHeight-200);
            d = dist(displayWidth/2, 450, this.x, this.y);
        }
        this.size = size;
        this.speed = 1;
        this.img = friendimg[name];
    }

    draw()
    {
        this.x += random(-this.speed, this.speed);
        this.y += random(-this.speed, this.speed);
        line(displayWidth/2, 350, this.x + this.size/2, this.y + this.size/2);
        image(this.img, this.x, this.y, this.size, this.size);
        // image(kje,displayWidth / 2 - 300 / 2, 200,300,300);
    }

    mouseClicked()
    {
        print(mouselock);
        let d = dist(this.x + this.size/2, this.y + this.size/2, mouseX, mouseY)
        if (d < this.size && ((mouselock == "") || (mouselock == this.name))){
            this.x = mouseX - this.size/2;
            this.y = mouseY - this.size/2;
            mouselock = this.name;
        }
    }
}