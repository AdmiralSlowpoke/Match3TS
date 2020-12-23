// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameLogic extends cc.Component {

    @property(cc.Node)
    GridLayout: cc.Node;
    @property([cc.SpriteFrame])
    Cubes: cc.SpriteFrame[]=[];
    @property(cc.Prefab)
    BlankCube: cc.Prefab;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.GenerateLayout();
    }
    GenerateLayout(){
        let field:number[][]=[];
        //Генерируем числовое поле
        for(let i=0;i<7;i++){
            field[i]=[];
            for(let j=0;j<8;j++){
                field[i][j]=RandomInt(0,4);
                let node=cc.instantiate(this.BlankCube);
                node.getComponent(cc.Sprite).spriteFrame=this.Cubes[field[i][j]];
                node.parent=this.GridLayout;
            }
        }
        //Пока что без проверки на начальные комбинации
        //Потом не допускать чтобы в ряду и строке было более двух одинаковых чисел
        //А так же более 3 одинаковых элементов в одном квадрате 2 на 2
}

}
function RandomInt(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;
}
