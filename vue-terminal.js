let vueTerminal = new Vue({
    el: "#vue-terminal",
    template: `
    <div id="vue-terminal" class="vue-terminal" @click="focus">
        <ul class="vue-terminal-output-container">
            <li v-for="entry in output">
                <pre v-for="line in entry.split('\\n')"><span>{{line}}</span></pre>
            </li>
        </ul>
        <div class="vue-terminal-input-container">
            <div class="vue-terminal-prefix">{{prefix}}</div>
            <span :id="inputId" :class="{ focused : isFocused }" @keyup="keyUp" class="vue-terminal-input" contenteditable="true"></span>
        </div>
    </div>
    `,
    data: {
        user: "## visitor@matrix.global.tech",
        directory: "/~",
        suffix: "$",
        history: new Array(),
        historyIndex: 0,
        input: "",
        output: new Array(),
        inputId: Math.floor(Math.random() * 1000),
        commands: {
            "help": `
            $ help
            $ clear
            $ ls
            $ bat`,
            "clear": "exec clear",
            "ls": ">>>> matrix.txt >>>> morse.txt >>>> robot.txt >>>> ml.txt >>>> books.txt >>>> global.txt >>>> chart.txt >>>> skills.txt >>>> super.txt \n",
            "bat": "Specify the file you want to open starting with bat (bat matrix.txt)... \n",
            "bat global.txt": `\n I am a software engineer working on personal projects. I believe what Ted Turner said who was one of the best entrepreneur.
Early to bed, early to rise, work like hell and advertise. Thats what I believe. \n`,
            "bat super.txt": `
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWXxcllccccccccllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllkNWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNx,                                                                                                                               ,xNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWO:.                                                                                                                                  ,xNMWWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMWWKl.                                                                                                                                      ,xNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMWXd'                                                                                                                                          ,xXWMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMNk;                                                                                                                                              ,xXMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMWWW0c.          .ldxxdddddddddo;                                ....''',,,'''......                         .lddxxddddddooo:.                          ,xNMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMXo.          .cKWMMWMMWWWWWKx:.                        ..;:ldxO0KXNNNWWWWWWNNXXXK00Oxol:,'.                 .oKWMMMMMMMWWKc.                            ,xXMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMWNx'           ;kNMMMMMWWMWKx:.                      .'cok0NWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWNKkd:'.              .oKWWMMMWNx'                                'dXWWMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMWO;           'xNMWMMMMMWNOc.                      'lxKNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWN0d:.             .lKWMNk;                                    'dXWMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMKl.          .lKWMMMMMMMNk;                      'lONWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWKd,             .lx:                        .l:.            'oXWMMMMMWMMMMMMMMMM
MMMMMMMMMMMMMMMXx'           ;OWMMMMMMMNk;                      ;kXWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWNk:.                                      :XW0c.            .oXWMWMMMMMMMMMMMM
MMMMMMMMMMMWWNk,           ,kNWMMMMWWWO:.                     ,kNMWWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWWWNk;                                     :NWWWKl.            'oKWMMWMMMMMMMMM
MMMMMMMMMMWWKc.          .oXWMMMMMMMXo.                      :KMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMXd.                                   :NMMMMWKl.            .oKWMWMMMMMMMM
MMMMMMMMMWXd.           :0WMWMMMMWWO,                       '0MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWO,                                  :NMMMWWWWKo.            .oKWMMMMMMMM
MMMMMMWMNk,           'xNMMMMMMMMNd.                        ;XMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMK;                                 ;XMMMMWMMMWKo.            .oKWMWMMMW
MMMMMMW0:.          .cKWWMMMMMMMXl.                         .xNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMK;                                ;XMMMMMMMMMMWKl.            .lKWMMWW
MMMMMKl.           'kNMMMWMMMMMNo                            .oXMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM0,                               ;XMMMMMMMMMMMWWKl.            .xWWWW
MMMWO,            ,0WWMMMMMMMMWx.                              'o0NMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWk.                              ,KWMMMMMMMMMMWWNx.            :0WMMM
MMMM0,            ,OWMMMMMMMMMK,                                 .,lk0XWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWWWOooooooooooooooooooooooooooooookNMMMMMMMMMMMMKc.           ,kNWMMMM
MMMMWKc.           .oXWMMMMMMMx.                                     .':lxOKNWWWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWXd.           .oXWWMWMMM
MMMMMMNk,            'xNMMMMMWl                                            ..;cldxO0KXNNWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNk;           .:0WWMMMMMMM
MMMMMMMMXo.            ;OWMMMNc                                                    ....',;:::ccclllloooooddddxxxkkkkkOOOOO00000KKXXXNNWWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMKl.           ,kWMMMMMMMMMM
MMMMMMMMMWKc.           .c0WMN:                                                                                              ........',;::loxOXWMMMMMMMMMMMMMMMMMMMMMMMMMMMNd'           .dXWWMMMMMMMMMM
MMMMMMMMMWWWO;            .oXX:                                                                                                               .;lkXWMMMMMMMMMMMMMMMMMMMMMNk,           .c0WMMMWMMMMMMMMM
MMMMMMMMMWMMMNk,            'l'                                                                                                                   .:xKWMMMMMMMMMMMMMMMMW0c.           ;kNWMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMXd.                                                                                                                                   .;xKWMMMWWMMMMMWMXo.           .dNMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMWKl.                                                                                                                                    .cONMWWMMMMMNx,           .cKMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMWWW0:.                                                                                                                                    .;xXMMMWWO;            ;OWMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMNk;                                                                                                                                      ,dXW0c.           'xNMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMWMNx'                                                                                                                                      .;.           .lXMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMWXo.                                                                                                                                                 :OWMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMWKc.                                                                                                                                             'xNWMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMWO:.                                                                                                                                         .oXMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMNk,                                                                                                                                      .:0WMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMXd'             ,dxdddoollcc:;;;,''.....                                                                                              ,kNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWKl.           .oXWMMWMMMMMMMWWWNNXXKK0OOOkxxdoollcc::;,,'.......                                                                  .dXWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWOc.           'xNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWWNNXXXKK000OOOkxdddooollcc::;,,'....                                     .c0WMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWO;           .;OWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWWNNXK0Okxol;'.                            ;OWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNx'           .lKWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWWN0xl,.                      .xNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWMMXd.           .oXWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWWMWWMNOc.                  .cKWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWKc.           ,xNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWMMMMMWWx.               .;kWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWWNO:            ;kKK0OkxdooolllloooddkO0KNWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWWMMMMMMWx.              'xNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWMMNk,            ...                   ..,:lxOXWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWMMWWWKo.             .lKWWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWXd'                                       .;lxKWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWWWKxc.              ;OWMWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWWWKl.                                         .;d0NMMMMMMMMMMMMMMMMMMMMMMMMMMMMWKOdl,.               'xNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWWW0c.                                          .,lkOKNWWMMMMMMMMWMMWWXK0Oxoc:,.                  .lKMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNk;                                              .,;;:clllccc::;;'...                        ;OWMMMWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWWNx'                                                                                      'xNWWMWWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMXd.                                                                                  .oXMMMMMMWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWKl.                                                                               :0WMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWO;                                                                            ,xNMMWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWWMWNk,                                                                        .oXMMWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWWMMMMNx'             .''..                                  .''.            .:0WMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWXo.           .o0X0kxol:;,'.......    ......',,:lodkOKKd.           ,kNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWWW0c.           ,kNMMWMMWWNXXKK000000000KKXXNWWMWWMMWO;           .oXMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWWWO;           .;ONWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMKl.          .:0WWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNx,           .c0WMMMMMMMMMMMMMMMMMMMMMMMMMMXx'           ,kNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMXd.           .lKMMMMMMMMMMMMMMMMMMMMMWMWO;           .oXMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWKl.           'dXWWMMMMMMMMMMMMMMMMWWKc.          .c0WMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWWW0:            ,xNMWMMMMMMMMMMMMMWXd.           ;kWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNk,            ;kNMMMMMMMMMMMWNk,           .dXWMMWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNd.           .:OWWWMMMMWWW0:.          .cKWWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMKl.           .cKWWWWWWKo.           ;kNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMW0:.           .lKNWXd'           'dXMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWWk,            .;:'           .lKWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWMNx'                        ;OWWWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWXo.                    'xNMWMWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMW0c.                .lXWMMMMMMWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNO;             .:OWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNx'          ,kNWWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMXo.      .oXWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMW0l.  .c0WWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWKOx0WMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM

`
 ,           "bat robot.txt": `
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkOOOOkkkxdollcclooooooooollldxkOk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkOOOkkxdolcclloddddxk0KXNNNXXNWMWNKOxolccldkkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkOkkxolc::clooddxk0KXWWMMMMMMMMMMMWXXNWWMMMMMWKkoc::lxkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkOkkdoc:;::cldxOKNWMMMMMMMMMMMMMMMMMMMMMMMWXXNMMMMMMMMMWKdc;:okkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkxolc:coooxOKNWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWNWWMMMMMMMMMMMW0o;;lkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkdllodk0XWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMXd::okkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkKNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNxldkkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkx0Ok0KOkOK00K0KKKNMMMMMMMMMWKOKWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWXOdxkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkdldKWMMMMMMMMMMMWNN0kxxkXWMMWOddoo0WMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWKlcxkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkdckWWMMMMMMMMMMMMMMMMMN0xddkXWXKNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWKl:dkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkOkodKMMMMMMMMMMMMMMMMMMMMWWMW0olxNMMMMMMMMMMMMMMMMMMMMMMMMMWWNNNXXXXNNNWMMMMMMMMMMMMMMMMMMNo;okk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkllXMMMMMMMMMMMMMMMMMMMMWXNMMMMKdo0WMMWX0kkXMMMMMMWNXXKK0OKXKXXNNXXXXXXXXKKXNMMMMMMMMMMMMMMK:'dOk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkolKMMMMMMMMMMMMMMMMMMMMWKKWMMMMMW0oxNMXxxxk0XKKKKXKKKXXXK0OXWWMMMMMMMMMMMWNXXXXWMMMMMMMMMMMMk';kkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkOdcOMMMMMMMMMMMMMMMMMMMMMXONMMMMMMMMNdoOKKKKKKXXNWMMMMMMMMMW0ONWWWMMMMMMMMMMMMMWX0KWMMMMMMMMMMNc.oOk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkcdWMMMMMMMMMMMMMMMMMMMMW00MMMMMMMMMMNoc0NWMMMMMMMMMMMMMMMWX0ddkddolcldk0NMMMMMMMW00NMMMMMMMMMMd.:kkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkOoc0MMMMMMMMMMMMMMMMMMMMMXONMMMMMMMMMMMXldWMMMMMMMWNXK0kxxxxddoodool:;,...;dXMMMMMMWK0NMMMMMMMMMO';kkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkcoNMMMMMMMMMMMMMMMMMMMMW0OWMMMMMMMMMMMMkcOWNKOxdodddddxoclloONMMMMWKXN0d:..'dNMMMMMWK0WMMMMMMMMK;,xOkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkOx:xMMMMMMMMMMMMMMMMMMMMMNOKMMMMMMMMMMMMMXl;oc'..:OXWMMMXolxxc'c0WMMMXKXKKK0d;.:KMMMMMW0KMMMMMMMMXc.oOkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkOdcOMMMMMMMMMMMMMMMMMMMMMKONMMMMMMMMMNOd0Wx'c:..cXMMMMMMNxlOWXd,,o000KKXNXKKKKx,,OMMMMMX0NMMMMMMMXo,ckkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkOolKMMMMMMMMMMMMMMMMMMMMMNXMMMMMMMMWOoldKWO'..'oKMMMMMMMMWKkxddl'.'codooodkX00WK;;0MMMMN0KMMMMMMMXc,okkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkOooXMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWNNMMMM0, .lKWMMMMMMMMMMWk,..;d0NWMMWNOo:oKX0l.oXNWMNO0WMMMMMMK:cOkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkOolXMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMK; .,OWMMMMMMMMMMXc.,kNMWKdok00NWd'';;..,OXXXXO0WMMMMMM0;:kkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkOooXMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMX:...'OMMMMMMMMMWd..kWMNkxo,lKOxKNl.:dc..xXNMN00WMMMMMMO;:xkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkloNMMMMMMMMMMMWWWNWMMMMMMMWWMMMMMMMMMMMMMNc.'..dXNMMMMMMMNc :XMW0OWWx,dKclNx;oxkd:xWMMMKKWMMMMMMkc:lkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkd;:kNMMMMMNOxdoolodxkk0NMMMNXNMMMMMMMMMMMMWd..;:ox0NMMMWNWXc.cXMWO0MMNl;OlcXxd0ON0ckMMMW0XMMMMMMWxl::kkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkd:kKNMMMMWOodkO0XNWWNKOOOXWMWXXWMMMMMMMMMMWd.;odxx0NMMMWNWWxcdOKN00WMMO;;ckOlOocXklKMMMXKWMMMMMMNo;;:xkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkx;:0WMMMMMMWXKXNNNWMMMMWK0NMMWNNMMMMMMMMMMMK:.:olxKWMMMMMMM0ccdOXNKO0KO:;kOoxx'oNodWMMWKXMMMMMWNK:.lkkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk:lo0MMMMMMWKKWWWNXXXNMMMMMMMMMMMMMMMMMMMMMNo.'lkXNMMMMMMMWNKdcdXWMN00OOOxdko..d0lOMMMXKWMMMMMWW0,'xkkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk:;'cXMMWX00xoooxOXWNNWMMMMMMMMMMMMMMMMMMMMMNx,.dWMWNNNXXXXK00koodkOOxllokOc. ;OodWMMNKNMMMMMNNWx.;kkkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk:,:OMMMWKxlc;,,';cd0NMMMMMMMMMMMMMMMMMMMMMMWXxodOXXXXNNWMWNKK00d;::'.dWW0c..xxoXMMWKKMMMMMMNNK:.'oxkkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkx:.cXMMMMMMWWKkOddooookKKNWMMMMMMMMMMMMMMMMMMMMXxllkKNMMMMMMMNKKdlOk,:XMMWOcodl0MMMX0NMMMMMWWWd,:,.lkkkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkOx::0WMMMMMMMMWkoxxdk0XWMMMMMMMMMMMMMMMMMMMMMMMMMMX:.:kMMMMMMMWNKclXd'xMMMMXo;;kWMMN0XMMMMMMWWO:d0d;lOkkkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkxloKMMMMMMMMMMN0O00XWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNc..dWMMMMMMXX0cod'lXWWKx:'.oWMMN0KMMMMMMWNXll000c:kkkkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkdlkNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWo. 'xKNWMWNXNWX0kxkOOOd;..lXMMW0KWMMMMWNNWx,oOKk,cOkkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkooKMMMMMMMMMMMMMMMMMMMMMMMMMMMMWNWMMMMMMMMMMMMMMMMMMMd...'';ccc:ccc:co:,dKdc;.lXMMWKKWMMMMMNXNK;.cxO:;xOkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkOol0MMMMMMMMMMMMMMMMMMMMMMMMMMMMWKKWMMMMMMMMMMMMMMMMMMMx..cO::x;';,;,,',;dXo. .oNMMWKKWMMMMMMNNNl.;ol,,dOkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkOxckWMMMMMMMMMMMMMMMMMMMMMMMMMMMMN0NMMMMMMMMMMMMMNK00O0Nx,,xNl';,'',:;;'.cXx. .lXWWWKKWMMMMMWWMWd':xl,;dkkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkOdcOMMMMMMMMMMMMMMMMMMMMMMMMMMMMMXKWMMMMMMMMMMMMMXkxxdkKloKXd.,lxkkllxo''O0, .l0KKKOONMMMMMN0XNx,,cc;lkkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkoldxkkOOOO0WMMMMMMMMMMMMMMMMMMMKKMMMMMMMMMMMMMMMMMMMNocKWx;dXWMMMXXWO,:0o..cXWMWKx0MMMMMMNXNx;lkkkkkkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkoc:;..;dKWMMMMMMMMMMMMMMMMMMMKKMMMMMMMMMMMMMMMMMMWx:OOl,cNMMNXKXNKl.'c:..xMMMM0kNMMMMWWMWx;lkkkkkkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkOx;lXMMMMMMMMMMMMMMMMMMMMMMXKWMMMMMMMMMMMMMMMMWOlOK; .xMXOdlkXXk;..ox,'OMMMM0xXMMMWWWWx;lkkkkkkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkOd:l0XKNWMMMMMMMMMMMMMMMMMMMXKWMMMMMMMMMMMMMMMWk:dOc'':0NxkK0NMMWd.'OO'.xWMMMNkkNNXNWWx.,xOkkkkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkx:l0XKKKKNMMMMMMMMMMMMMMMMMX0NMMMMMMMMMMMMMMWx..;dOOkKW0o0MMMMMWx'.:Ok''xWMMMNxldkKKd;c:;xkkkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkllxkO00KKNMMMMMMMMMMMMMMMNKXMMMMMMMMMMMMMNx'..;xXWNWMXloXN0KMM0c,.,xO:.lXMMWXockOxcdO:'dkkkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkOklclokkkKNX0xOWMMMMMMMMMWXNMMMMMMMMMMMMKd:'.,:okXWWMMKoloooxOkl.  .oxccodOXXOKWOoddo'.dkkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkOkd0XOOOOKXKOOXWMMMMMMMMMWXNMMMMMMMMMMWO:'..,::;cxO0XWMWXK0O0K0c..:x0OxkOxxdoO0x;;xkOx:ckkkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkOOd0MMMMMMMWWMMMMMMMMMMMMWXWMMMMMMMMMXo...',..  ..',:ldkkkxdl:,':dkKW0ldxoKx':l..cdokNXkxxkkkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkOOxdO00kxKNXNMMMMMMMMMMMMXXMMMMMMMMWO;. .:xkx;.     .........,ool::o0Ol::cdl.'ll;;ld0NWMXkdkkkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkOOkxl,:kNMMMMMMMMMMMMMMN0XMMMMMMNOc. .;;::col.  .,'.::.'. .','..ckOXK0O00Ol...:do;,cONWMWOcokkkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkOOOOOxl0MWMMMMMMMMMMMMMWKKWMWMN0d;. ..,clkxc;.. .ckx:.,;;c'.,l,  ;dOKKXNWWNx,',,;okl;l0NNWWKdokkkkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkOkkOd:kMMMMMMMMMMMMMMMNKWWNOo;.  .,;,'';ldxxl'..oOOx:..,:, .xl .:oooooddxo,';'...,od,'xNWWMNockOkkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkOx:dMMMMMMMMMMMMMMMN0xc;'....,lkkxoc;::,;dOk:,;lkx,.... .do.'xNWMWNKXNx'cOxc.  .ld'.xXNMMKclkkkkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkllXMMMMMMMMMMMN0dc::coxxxxxkkkkkkkkd:',lkOOdc;;xo.    .dd.;KWMMMNdcxl'lOkko'  'dl.'xNMMMx:xOkkkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkodOKNWWWWNKkoc:cdkkkkkkkkkkkkkkkkkOx; .,ldO0Ol:dc. ...dd.lNWMMMKocxl'lOkkkl. .cd..xMMMMk:dOkkkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkxddxxxxxxoloxkkkkkkkkkkkkkkkkkkkkOd'  ,doONXk::d, ''.;,.xWWMMMNK0Ko.,dOkOo.  :d'.dMMMMO:oOkkkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkOl.  .okk0OKx,lc..'.  ,0WWMMMMMMNc.':xOk:. .cx,.dWMMMk:dOkkkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkc.  .:ooxOKOc,,..:;  :XMMMMMMMMK;.',ckl,c,.lx'.dWMMMx;dOkkkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk:. .'.cl:xXN0,  .l:..oWMMMMMMMMk. ..;o,cNd,oo..xWMMWo;xOkkkkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk;  ,c.:dco0NXo. .,. .xMMMMMMMMMd..'...;0X:.c;.:kXNWO;ckkkkkkkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk;  .l,'llcxXXx'   .''kMMMMMMMMWl.:,..'kNkloc;dKOkOk;'okOOkkkkkkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkl. .'..:xclOKO:  ...,0MMMMMMWWNc.;. .xNOoxOodNMWNNkcllccclodkkOkkkkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkdl,.   .;olo0XXo... .lNMMMMMMWWK; .  :0OodkxlOMMMMNolO000kdolc::loxkOkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkxl,..':,. .,;coOXXO,.. .dWMMMMMMNN0,  .:c:;lkd:oNMMMM0,,O0OO0XWWN0kolc:cokkkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkOOkxl;;ckKKd.  ..;ldOOk;..':OMMMMMMWNWk. 'xNNKc''.,xXWMMWd.;KMMNOllKWMMMWNOdc:cdkkkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkOOxloxOXX00d,...',codO0Kd,,cxKMMMMMMW0Kx. ,ldkkc:oclkkkkkx,.,xKXKOl.;0WWWWNXNNKd::okkkkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkddoo0XXK00Ox:,:l:,:dkKNNk::lkXMMMMMMNKXd..ckxdl:xK0OOOkkxo:clc:::;'..xWNXNNKKXWNKxdkkkkkkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkd:,dXXKKXWN00k:;kKxllxddko;',ldxKNWWMN00Xl .dXNK;;KWK0KKOOKKOoc:,..  .:OWWWWWMWWMWNNNk;lkkkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkxc,c0X0KNMNK0KXOdd0WWWWNK0Kx:;,,,,dOxol:,cddxO0Ox:.cXWNWMMWNNX0o...,;cox0WMMMMMMMMMMMMMWO:lkkkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkxc,:ONKOXWWX0KNMWO::x0K0KK00k:..';cd00OxoloOXNX00kd;..,lOK0000000OO0KNWMMMMMMMMMMMMMMMMWXk:;dkkkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkl,,xNXO0NWNKKNMWMK:.';:;;::;:cldkKNWKxOX0kkdldo:;;;:ccloxOKXNWMMMMMMMMMMMMMMMMMMMMMWNKOxl:..okkkkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkd;'lKWKOKWWX0NMMMMMNklllooodk0XNWMMMMMXO0KOxl;;looxk0XNWMMMMMMMMMMMMMMMMMMMMMMMMWX0koc,..  .. ;xOkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkko,;OWWKOXMMK0NMMMMMMMMMMMMMMMMMMMMMMWN0xollldkKNMMMMMMMMMMMMMMMMMMMMMMMMMMKxolooc;'.    ..',;:cokk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkl,oXMMKONWNX0NMMMMMMMMMMMMMMMMMMMWXkocccokKWMMMMMMMMMMMMMMMMMMMMMMMMMMMWN0x,..   ...,;:clodkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkl:kWMMNOKWNWKKWMMMMMMMMMMMMMMMWKko:;:okXWMMMMMMMMMMMMMMMMMMMMMMMMMMMNKko:,. ..,:clodx
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkxclKMMMW00NKXWOkWMMMMMMMMMMWKkoc:,;lkKWMMMMMMMMMMMMMMMMMMMMMMMMMMWN0ko:.. ..':ldkOO
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkOxcoXMMMMNOKN0KNKdkNMMMMWXOdc;,;coxKNMMMMMMMMMMMMMMMMMMMMMMMMMMMWKxl;....';coxkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkldNMMMMMNO0XOOKX0xxxlc:;'';lx0NMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNOo;....,:ldkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkodXMMMMMMMN00Okxolcc,..;lkKWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNkl,...,:oxkOk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkOolKMMMMMMMMMMWXKKkxxxk0XWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNOl,..;coxkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkl;kWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMXx;.':lxkkkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk:;0MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWNK0Od;':oxkkkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkOx,lNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWX0kxdl:,'...,lxkkkkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkOc;0MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWXOxl;'......,,,:dkkkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkl;OMMMMMMMMMMMMMMMMMMMMMMMWNKkdc:;'..';:coddxxk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkl;OMMMMMMMMMMMMMMMMMMMWKko:,...,;:coxkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkxcOMMMMMMMMMMMMMMMMNOo;...,:ldxkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkko0MMMMMMMMMMMMMW0d;.';coxkOk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkcKMMMMMMMMMMMXk:',coxkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkllXMMMMMMMMWKd;':okkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkldNMMMMMMWKo,'cxkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkOx:xMMMMMMXo''cxkkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkOl,dWMMMNk,.:xkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkxlclood:..lkk
kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkxolcccdk



>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


`
,
            "bat skills.txt": `
Frontend:
    JS/html/css ********** 
    JSON        *****
    jQuery      **********
    Angular     *****
    Ajax        ***
    React       ***

Backend:
    PHP         ********
    MySQL       ********
    .NET        *****
    Node.js     ***

A bit of everything else:
    C#          *****
    Java        *****
    Android     ******
    Kotlin      ******
    AVR ASMB    **
    C++         **
    Fortran     **
    SQL         ***
    Python      *****
`
,
          "bat matrix.txt": `
101000010001111101010111100011010101010010101010100000111110101010010101100101001010101001010010101010101010101010000110111111110010010100101010001010101010101011
00011010010000011111010101010010101010010101010100101011111110110101000101001010100101001010100100101010101010

.. / .- -- / --. --- -.. / -.-.--
`
,
          "bat books.txt": `
    
>>>>>>>>The Books/Articles I've read:

--> Dictionary of Computers
--> The Art of War
--> The Code Book
--> Singularity
--> The UFO Singularity
--> A Journey To the Centre of The Earth 
--> English - Japanese Dictionary
--> Essential Computer Mathematics
--> C#
--> Java
--> Android Java
--> Python
--> Bootstrap 
--> HTML/CSS/JS
--> Mechanical Engineering
--> Software Engineering
--> Artificial Super Intelligence
--> Chemistry
--> Biology
--> Physics
--> Neural Networks
--> Python PyBrain
--> Python Neural Networks
--> JS Neural Networks
--> Bulfinch's Mythology
--> Da Vinci Notebook
--> Isaac Newton Gravity Notes
--> Einstein Theory of Time and Space
--> Longfellow's Poetical Works (1910)
--> An Anthology of Humorous Verse (Unknown Year/One and Only) leather cover
--> Dictionary of English Literature (1850)
--> Tao of Jeet Kune Do
--> Robotics

`
,
          "bat ml.txt": `
 ____________________________________________________________________________________
|                |Eurekahedge     |Eurekahedge     |Eurekahedge     |                |
|                |AI/Machine L.   |CTA/Managed F.  |Trend           |Eurekahedge     |
|                |Hedge Fund Index|Hedge Fund Index|Following Index |Hedge Fund Index|
|________________|________________|________________|________________|________________|
|      2011      |     14.10%     |      2.33%     |      0.71%     |     (1.15%)    |
|________________|________________|________________|________________|________________|
|      2012      |     (1.80%)    |      2.66%     |     (1.86%)    |      7.34%     |
|________________|________________|________________|________________|________________|
|      2013      |      10.34%    |      0.55%     |      1.02%     |      9.24%     |
|________________|________________|________________|________________|________________|
|      2014      |      7.64%     |      9.66%     |     13.44%     |      4.89%     |
|________________|________________|________________|________________|________________|
|      2015      |      16.40%    |     (0.31%)    |     (2.18%)    |      1.78%     |
|________________|________________|________________|________________|________________|
|      2016      |      5.01%     |      1.15%     |     (0.62%)    |      4.48%     |
|________________|________________|________________|________________|________________|
|5y.annual return|      7.35%     |      2.68%     |      1.80%     |      5.51%     |
|________________|________________|________________|________________|________________|
|5y.annual       |                |                |                |                |
|volatility      |      4.95%     |      4.18%     |      7.13%     |      3.20%     |
|________________|________________|________________|________________|________________|
|5y. Sharpe Ratio|                |                |                |                |
|(RFR=1%)        |      1.28      |      0.40      |      0.11      |      1.41      |
|________________|________________|________________|________________|________________|
|3y.annual return|      9.57%     |      3.41%     |      3.31%     |      3.71%     |
|________________|________________|________________|________________|________________|
|3y.annual       |                |                |                |                |
|volatility      |      5.61%     |      4.63%     |      7.78%     |      3.03%     |
|________________|________________|________________|________________|________________|
|3y. Sharpe Ratio|                |                |                |                |
|(RFR=1%)        |      1.53      |      0.52      |      0.30      |      0.89      |
|________________|________________|________________|________________|________________|
|2y.annual return|      10.56%    |      0.42%     |     (1.40%)    |      3.12%     |
|________________|________________|________________|________________|________________|
|2y.annual       |                |                |                |                |
|volatility      |      6.31%     |      4.90%     |      8.07%     |      3.31%     |
|________________|________________|________________|________________|________________|
|2y. Sharpe Ratio|                |                |                |                |
|(RFR=1%)        |      1.51      |      (0.12)    |     (0.30)     |      0.64      |
|________________|________________|________________|________________|________________|


`
,
          "bat morse.txt": `

A	.-        N	-.        0	-----
B	-...      O	---       1	.----
C	-.-.      P	.--.      2	..---
D	-..       Q	--.-      3	...--
E	.         R	.-.       4	....-
F	..-.      S	...       5	.....
G	--.       T	-         6	-....
H	....      U	..-       7	--...
I	..        V	...-      8	---..
J	.---      W	.--       9	----.
K	-.-       X	-..-
L	.-..      Y	-.--
M	--        Z	--..
    
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
ä	.-.-      & Ampersand	.-...
á	.--.-     ' Apostrophe	.----.
å	.--.-     @ At sign	.--.-.
Ch	----      ) Bracket, close (parenthesis)	-.--.-
é	..-..     ( Bracket, open (parenthesis)	-.--.
ñ	--.--     : Colon	---...
ö	---.      , Comma	--..--
ü	..--      = Equals sign	-...-
              ! Exclamation mark
              Not in ITU-R recommendation	-.-.--
              . Full-stop (period)	.-.-.-
              - Hyphen	-....-
              + Plus sign	.-.-.
              " Quotation marks	.-..-.
              ? Question mark (query)	..--..
              / Slash	-..-.

>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
<AA> New line	.-.-
<AR> End of message	.-.-.
<AS> Wait	.-...
<BK> Break	-...-.-
<BT> New paragraph	-...-
<CL> Going off the air ("clear")	-.-..-..
<CT> Start copying	-.-.-
<DO> Change to wabun code	-..---
<KN> Invite a specific station to transmit	-.--.
<SK> End of transmission	...-.-
<SN> Understood (also VE)	...-.
<SOS> Distress message	...---..

`
    
,
          "bat chart.txt": `
         _____________________________________________
        |                                             |
        |    __                                       |
        |   |  |                                      |
        |   |  |                  __                  |
        |   |  |                 |  |                 |
        |   |  |                 |  |                 |   
        |   |  |                 |  |           __    |
        |   |  |    __           |  |          |  |   |
        |   |  |   |  |          |  |          |  |   |
        |   |  |   |  |    __    |  |          |  |   |
        |   |  |   |  |   |  |   |  |    __    |  |   |
        |   |  |   |  |   |  |   |  |   |  |   |  |   |
        |___|__|___|__|___|__|___|__|___|__|___|__|___|
            HTML   JSON   Node   PHP    AVR   Android
            CSS   angular Ajax   MySQL  C++    Kotlin
            JS     .NET   AVR          Fortran
          jQuery   Java   SQL           
                   C#     React
                  Python                      
                           
`
        }
    },
    computed: {
        prefix: function () {
            return `${this.user}${this.directory} ${this.suffix}`;
        }
    },
    methods: {
        isFocused: function () {
            return document.activeElement.id == this.inputId;
        },
        focus: function () {
            while (document.activeElement.id != this.inputId) {
                document.getElementById(this.inputId).focus();
            }
        },
        keyUp: function (e) {

            switch (e.keyCode) {
                case 13:
                    e.preventDefault();
                    this.execute();
                    break;

                case 38:
                    e.preventDefault();
                    this.previousHistory();
                    break;
                case 40:
                    e.preventDefault();
                    this.nextHistory();
                    break;
            }

            this.updateInputValue();
        },
        updateInputValue: function () {
            this.input = document.getElementById(this.inputId).innerHTML;
        },
        updateFieldValue: function () {
            document.getElementById(this.inputId).innerHTML = this.input;
        },
        execute() {
            let tempInput = this.input.replace("<br>", "");
            tempInput = tempInput.replace("<div>", "");
            tempInput = tempInput.replace("</div>", "");
            this.historyIndex = 0;
            this.history.unshift(tempInput);

            let tempOutput = this.commands[tempInput];

            if (typeof tempOutput == "undefined") tempOutput = `Couldn't find command: ${tempInput}\nType 'help' for more information.`;

            switch (tempOutput) {
                case "exec clear":
                    this.clear();
                    return;
                    break;
            }

            this.output.push(`${this.prefix} ${tempInput}`);
            this.output.push(tempOutput);

            document.getElementById(this.inputId).innerHTML = "";
            this.input = "";

            Vue.nextTick(function () {
                document.getElementById("vue-terminal").scrollBy(0, 10000);
                document.getElementsByClassName("vue-terminal-input")[0].focus();
            });
        },
        previousHistory: function () {
            if (this.historyIndex + 1 > this.history.length) return;
            this.input = this.history[this.historyIndex++];
            this.updateFieldValue();
        },
        nextHistory: function () {
            if (this.historyIndex - 1 < 0) return;
            this.input = this.history[this.historyIndex--];
            this.updateFieldValue();
        },
        clearInput: function () {
            document.getElementById(this.inputId).innerHTML = "";
            this.input = "";
        },
        clear: function () {
            this.output = new Array();
            this.clearInput();
        },
    }

});