function generateGameBoard(x,y)
{
    console.log("build a board " + x + " by " + y );
    $("#gameBoard").html("");

    let html = "";
    for(i = 0; i <y; i++)
    {
        html += "<tr>";
        for(z = 0; z < x; z++)
        {
            html += "<td>";
            html += "<i class='fa fa-square grid' id='"+i + "-" + z+ "' data-player='-1'></i>"
            html += "</td>";
        }
        html += "</tr>";
    }
    console.log(html)
    $("#gameBoard").html(html);
    var player = 1;
    $("#gameBoard").on("click", ".fa", function(){

        //console.log("hello there");
        //console.log(this);

        //$(this).hide('slow');
        //$(this).css('color', '#f0544f');

        if($(this).hasClass('fa-square'))
        {
            if(player ===1)
            {
                $(this).removeClass('fa-square');
                $(this).addClass('fa-times');

                $(this).data('player', player);
                checkWinners(player, this);

                player = 2;
                $('#message').html('Turn: Player two');
                $(this).data('player', 1);
            }
            else if(player === 2)
            {
                $(this).removeClass('fa-square');
                $(this).addClass('fa-circle-o');

                $(this).data('player', player);
                checkWinners(player, this);

                player = 1;
                $('#message').html('Turn: Player one');
                $(this).data('player', 2);
            }
        }
    });
}

function checkWinners(player, tile)
{
    //console.log("player is: " + player)
    //console.log(tile)

    let id = $(tile).attr("id");
    //console.log("the id is: " +id);

    let location = id.split("-");
    let row = parseInt(location[0]);
    let col = parseInt(location[1]);

    let next = "#" + row + "-" + (col+1);
   // console.log("the next spot is: " + next);
    if( $(next).data("player") === $(tile).data("player"))
    {
        //console.log("its the same")
    }
    else
    {
        //console.log("its different")
    }

    consecutive = checkNext(1,0, col, row);
    consecutive = checkNext(-1,0, col, row);

    if(consecutive > 2)
    {
        console.log("you've won!")
    }

    consecutive = checkNext(0,1, col, row);
    consecutive = checkNext(0,-1, col, row);

    if(consecutive > 2)
    {
        console.log("you've won vert!")
    }
}

function checkNext(stepX, stepY, x, y)
{
    let consecutive = 0;
    let next = "#" + (y+stepY) + "-" + (x+stepX);
    while($(next).data("player")=== $("#" + y+ "-" + x).data("player"))
    {
        consecutive++;
        console.log("Found " + consecutive);
        stepX = stepX + stepX;
        stepY = stepY + stepY;
        next = "#" + (y + stepY) + "-" + (x + stepX);
    }
    return consecutive;
}
