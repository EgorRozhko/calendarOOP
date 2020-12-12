<?php
    include_once ('../mysql/connect.php');
    $res = mysqli_query($connection, 'SELECT events_id, date_event,Month(date_event) FROM events WHERE Year(date_event)='.$_POST['year']);
    $my_array = array();
    while($row = mysqli_fetch_array($res)) $my_array[$row['date_event']] = $row['events_id'];

function draw_calendar($month, $year, $action) {
    $calendar = '<table cellpadding="0" cellspacing="0" class="b-calendar__tb">';

    // вывод дней недели
    $headings = array('Пн','Вт','Ср','Чт','Пт','Сб','Вс');
    $calendar.= '<tr class="b-calendar__row">';
    for($head_day = 0; $head_day <= 6; $head_day++) $calendar.= '<th class="b-calendar__head"><div class="b-calendar__number">'.$headings[$head_day].'</div>';
    $calendar.= '</tr>';

    // выставляем начало недели на понедельник
    $running_day = date('w',mktime(0,0,0,$month,1,$year));
    $running_day = $running_day - 1;
    if ($running_day == -1) {
        $running_day = 6;
    }

    $days_in_month = date('t',mktime(0,0,0,$month,1,$year));
    $day_counter = 0;
    $days_in_this_week = 1;
    $dates_array = array();

    // первая строка календаря
    $calendar.= '<tr class="b-calendar__row">';

    // вывод пустых ячеек
    for ($x = 0; $x < $running_day; $x++) {
        $calendar.= '<td class="b-calendar__np"></td>';
        $days_in_this_week++;
    }

    // дошли до чисел, будем их писать в первую строку
    for($list_day = 1; $list_day <= $days_in_month; $list_day++) {
        $day = date('Y-m-d',mktime(0,0,0,$month, $list_day, $year));
        if (array_key_exists($day, $action))
        {
            $calendar.= '<td align="center" class="b-calendar__day b-calendar__weekend" id='.$action[$day];
            $calendar .= '>';
        }
        else 
        {
            $calendar.= '<td align="center" class="b-calendar__day';
            $calendar .= '">';
        }
        $calendar.= '<div class="b-calendar__number">'.$list_day.'</div>';
        $calendar.= '</td>';

        // дошли до последнего дня недели
        if ($running_day == 6) {
            // закрываем строку
            $calendar.= '</tr>';
            // если день не последний в месяце, начинаем следующую строку
            if (($day_counter + 1) != $days_in_month) {
                $calendar.= '<tr class="b-calendar__row">';
            }
            // сбрасываем счетчики
            $running_day = -1;
            $days_in_this_week = 0;
        }

        $days_in_this_week++;
        $running_day++;
        $day_counter++;
    }

    // выводим пустые ячейки в конце последней недели
    if ($days_in_this_week < 8) {
        for($x = 1; $x <= (8 - $days_in_this_week); $x++) {
            $calendar.= '<td class="b-calendar__np"> </td>';
        }
    }
    $calendar.= '</tr>';
    $calendar.= '</table>';

    return $calendar;
}

    $months = Array(
        0 => 'Январь',
        1 => 'Февраль',
        2 => 'Март',
        3 => 'Апрель',
        4 => 'Май',
        5 => 'Июнь',
        6 => 'Июль',
        7 => 'Август',
        8 => 'Сентябрь',
        9 => 'Октябрь',
        10 => 'Ноябрь',
        11 => 'Декабрь'
    );
     if ($_POST['year'] == 1941) {
        $month = 6;
        $lastMonth=12;
    }
    else{
        $lastMonth=12;
        $month=1;
    }
    if($_POST['year']==1945)
    {
        $lastMonth=5;
        $month=1;
    }
    else $lastMonth =12;
    echo "<div class='bigCalendar'>";
    for ($month; $month <= $lastMonth; $month++) 
    { 
        echo'
            <div class="b-calendar b-calendar--many">
                <div class="b-calendar__title">
                    <span class="b-calendar__month">'.$months[$month-1].'</span>
                </div>'
               .draw_calendar($month,$_POST['year'],$my_array).
            '</div>';
    }
    mysqli_close($connection);
?>