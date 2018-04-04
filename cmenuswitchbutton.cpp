#include "include/cmenuswitchbutton.h"
#include "include/Customerkeycode.h"

CMenuSwitchButton::CMenuSwitchButton(QWidget *parent,int type) :
    QWidget(parent)
{
    widgetType = type;
    strValue = -1;
    bkColor = QColor(0,0,0,0);
    isEnabledFlag = true;
    isSetLocation = false;

    setAutoFillBackground(true);
    QPalette palette=QPalette();
    palette.setColor(QPalette::Background,bkColor);
    setPalette(palette);

    QFont font;
    font.setBold(true);
    font.setPixelSize(20);
    font.setFamily(FONTFAMILY);
    //setFont(font);

    QFont font1;
    font1.setBold(true);
    font1.setPixelSize(20);
    font1.setFamily(FONTFAMILY);

    setFocusPolicy(Qt::StrongFocus);

    if(widgetType == 0)
    {
        middlepushbuttonImage = new QLabel(this);
        middlepushbuttonImage->setFocusPolicy(Qt::NoFocus);
        middlepushbuttonImage->setGeometry(QRect(this->width()/5, this->height()/4, this->width()*1/25, this->height()/2));
        middlepushbuttonImage->setPalette(palette);
        middlepushbuttonImage->setScaledContents(true);
        //add event Filter
        middlepushbuttonImage->installEventFilter(this);
    }
    else
    {
        leftTitle = new QLabel(this);
        leftTitle->setText("Qt");
        leftTitle->setFont(font1);
        leftTitle->setAlignment(Qt::AlignLeft | Qt::AlignVCenter);
        leftTitle->setGeometry(QRect(this->width()*6/25, 0, this->width()*3/5, this->height()));//占整体的3/5
        palette.setColor(QPalette::WindowText, QColor(221,221,221,255));
        leftTitle->setPalette(palette);
        //add event Filter
        leftTitle->installEventFilter(this);
    }

    middlepushbutton = new QLabel(this);
    //middlepushbutton->setFocusPolicy(Qt::NoFocus);
    middlepushbutton->setText("Qt");
    if(widgetType == 0)
    {
        middlepushbutton->setFont(font);
    }
    else
    {
        font1.setPixelSize(14);
        middlepushbutton->setFont(font1);
    }
    middlepushbutton->setAlignment(Qt::AlignHCenter | Qt::AlignVCenter);
    middlepushbutton->setGeometry(QRect(this->width()*6/25, 0, this->width()*3/5 + 20, this->height()));//占整体的3/5
    //middlepushbutton->setStyleSheet("QPushButton{text-align : middle;font-size : 18px}");//设置字体风格
    palette.setColor(QPalette::WindowText, QColor(221,221,221,255));
    middlepushbutton->setPalette(palette);
    //add event Filter
    middlepushbutton->installEventFilter(this);

    leftlabel = new QLabel(this);
    leftlabel->show();
    leftlabel->setFocusPolicy(Qt::NoFocus);
    movie.load(":/image/images/Epg/vch_left.png");
    leftlabel->setPixmap(movie);
    leftlabel->setScaledContents(true);
//    leftlabel->setGeometry(QRect(0, 0, 15*width()/1366, 28*height()/768));
    leftlabel->setPalette(palette);
    //add event Filter
    leftlabel->installEventFilter(this);

    rightlabel = new QLabel(this);
    rightlabel->show();
    rightlabel->setFocusPolicy(Qt::NoFocus);
    movie.load(":/image/images/Epg/vch_jump.png");
    rightlabel->setPixmap(movie);
    rightlabel->setScaledContents(true);
//    rightlabel->setGeometry(QRect(this->width()*4/5, 0, 15*width()/1366, 28*height()/768));
    rightlabel->setPalette(palette);
    //add event Filter
    rightlabel->installEventFilter(this);

}

void CMenuSwitchButton::setGeometry(const QRect &rect)
{
    QWidget::setGeometry(rect);
}

bool CMenuSwitchButton::eventFilter(QObject *watched,QEvent *event)
{
    return QWidget::eventFilter(watched,event);
}

void CMenuSwitchButton::focusInEvent(QFocusEvent *e)
{
    if(!isEnabledFlag)
    {
        clearFocus();
        return;
    }

    QPalette palette=QPalette();
    palette.setColor(QPalette::Background,QColor(220,34,43,255));
    setPalette(palette);

    leftlabel->show();
    rightlabel->show();

    if(strValue >= 0)
    {
        if(pixmapSwitch.at(strValue) != NULL)
        {
            middlepushbuttonImage->clear();
            middlepushbuttonImage->setPixmap(*pixmapSwitch[strValue]);
//            middlepushbutton->setGeometry(QRect(this->width()*8/25, 0, this->width()*3/5, this->height()));
            middlepushbutton->setGeometry(QRect(this->width()/5, 0, this->width()*3/5, this->height()));
            middlepushbuttonImage->show();
        }
        else
        {
            if(widgetType == 0)
            {
                middlepushbuttonImage->clear();
                middlepushbutton->setGeometry(QRect(this->width()/5, 0, this->width()*3/5, this->height()));
                middlepushbuttonImage->hide();
            }
        }

        int textWidth = middlepushbutton->fontMetrics().width(strSwitch[strValue]);
        if(textWidth>middlepushbutton->width())
        {
            QString str = strSwitch[strValue];
            int place = 0;
            while(1)
            {
                place++;
                QString tmp = str.left(place);
                if(middlepushbutton->fontMetrics().width(tmp)>=middlepushbutton->width())
                    break;
            }
            str = str.left(place-3);
            str = str + "..";
            middlepushbutton->setText(str);
        }
        else
            middlepushbutton->setText(strSwitch[strValue]);
        middlepushbutton->update();
    }
}

void CMenuSwitchButton::focusOutEvent(QFocusEvent *e)
{
    QPalette palette=QPalette();
    palette.setColor(QPalette::Background,bkColor);
    setPalette(palette);

//    leftlabel->hide();
//    rightlabel->hide();
    leftlabel->show();
    rightlabel->show();

}

void CMenuSwitchButton::setText(const QString & pushButtontext/*,const QString & labeltext*/)
{
    if(widgetType != 0)
    {
        leftTitle->setText(pushButtontext);
    }
   // middlepushbutton->setText(pushButtontext);
    //menulabel->setText(labeltext);
}

void CMenuSwitchButton::addSwitchValue(QString strVector)
{
    QPixmap *pixmap = NULL;
    addSwitchValue(strVector,pixmap);
}

void CMenuSwitchButton::addSwitchValue(QString strVector,QPixmap *pixmap)
{
    strSwitch.push_back(strVector);
    if(strSwitch.count() != 0 && strValue != 0)
    {
        strValue = 0;
    }

    pixmapSwitch.push_back(pixmap);
//        middlepushbuttonImage->setPixmap(*pixmap);
//        middlepushbuttonImage->setScaledContents(true);
}

void CMenuSwitchButton::removeAllValue()
{
    int childrenCount = pixmapSwitch.count();
    for(int i=0;i<childrenCount;++i)
    {
        QPixmap *pixmap = pixmapSwitch.at(i);
        if(pixmap != NULL)
        {
            delete pixmap;
            pixmap = NULL;
        }
    }

    strSwitch.clear();
    pixmapSwitch.clear();
    strValue = -1;
    if(widgetType == 0)
    {
        middlepushbuttonImage->clear();
        middlepushbutton->clear();
        middlepushbuttonImage->update();
    }
    else
    {
        middlepushbutton->clear();
    }
    middlepushbutton->update();
}

void CMenuSwitchButton::setBackgroundColor(QColor color)
{
    bkColor = color;
}

void CMenuSwitchButton::setFocus()
{
    //menupushButton->setFocus();
    //middlepushbutton->setText(strSwitch[strValue]);
    //middlepushbutton->update();
    QWidget::setFocus();
    emit itemHasFocus(strValue);
}

void CMenuSwitchButton::setValue(int idx)
{
    if(idx<=strSwitch.count()-1 && idx>=0)
    {
        strValue = idx;
        emit changeValue(strValue);
    }
//    emit changeValue(strValue);

    if(pixmapSwitch.count() != 0)
    {
        if(pixmapSwitch.at(strValue) != NULL)
        {
            middlepushbuttonImage->clear();
            middlepushbuttonImage->setPixmap(*pixmapSwitch[strValue]);
            middlepushbuttonImage->setGeometry(QRect(this->width()/5, 0, this->width()*1/25, this->height()));
//            middlepushbutton->setGeometry(QRect(this->width()*6/25, 0, this->width()*3/5, this->height()));
            middlepushbuttonImage->show();
        }
        else
        {
            if(widgetType == 0)
            {
                middlepushbuttonImage->clear();
                middlepushbutton->setGeometry(QRect(this->width()/5, 0, this->width()*3/5, this->height()));
                middlepushbuttonImage->hide();
            }
        }
    }

    int textWidth = middlepushbutton->fontMetrics().width(strSwitch[strValue]);
    if(textWidth>middlepushbutton->width())
    {
        QString str = strSwitch[strValue];
        int place = 0;
        while(1)
        {
            place++;
            QString tmp = str.left(place);
            if(middlepushbutton->fontMetrics().width(tmp)>=middlepushbutton->width())
                break;
        }
        str = str.left(place-3);
        str = str + "..";
        middlepushbutton->setText(str);
    }
    else
        middlepushbutton->setText(strSwitch[strValue]);
    middlepushbutton->update();
}

void CMenuSwitchButton::setEnabled(bool flag)
{
    if(!flag)
    {
        QPalette palette;
        palette.setColor(QPalette::WindowText,QColor(120, 120, 120, 255));
        if(widgetType == 0)
        {
            middlepushbuttonImage->setPalette(palette);
        }
        else
        {
            leftTitle->setPalette(palette);
        }
        middlepushbutton->setPalette(palette);
        leftlabel->setPalette(palette);
        rightlabel->setPalette(palette);
        movie.load(":/image/images/turning/leftarrow.png");
        leftlabel->setPixmap(movie);
        movie.load(":/image/images/turning/rightarrow.png");
        rightlabel->setPixmap(movie);
        isEnabledFlag = false;
    }
    else
    {
        QPalette palette;
        palette.setColor(QPalette::WindowText,Qt::white);
        if(widgetType == 0)
        {
            middlepushbuttonImage->setPalette(palette);
        }
        else
        {
            leftTitle->setPalette(palette);
        }        middlepushbutton->setPalette(palette);
        leftlabel->setPalette(palette);
        rightlabel->setPalette(palette);
        movie.load(":/image/images/Epg/vch_left.png");
        leftlabel->setPixmap(movie);
        movie.load(":/image/images/Epg/vch_jump.png");
        rightlabel->setPixmap(movie);
        isEnabledFlag = true;
    }
    update();
}

void CMenuSwitchButton::setDisabled(bool flag)
{
    setEnabled(!flag);
}

void CMenuSwitchButton::setFont(QFont titleFont,QFont valueFont)
{
    if(widgetType == 0)
    {
        middlepushbutton->setFont(titleFont);
    }
    else
    {
        leftTitle->setFont(titleFont);
        middlepushbutton->setFont(valueFont);
    }
}

void CMenuSwitchButton::setLocation(QRectF title,QRectF leftImage,QRectF middleText,QRectF rightImage)
{
    if(widgetType)
    {
        isSetLocation = true;
        titleLocation = title;
        leftImageLocation = leftImage;
        middleTextLocation = middleText;
        rightImageLocation = rightImage;
    }
}

bool CMenuSwitchButton::isEnabled()
{
    return isEnabledFlag;
}

QString CMenuSwitchButton::getCurrentValue()
{
    return  middlepushbutton->text();
}//end getCurrentValue

int CMenuSwitchButton::getCurrentIndex()
{
    return strValue;
}//end getCurrentIndex

int CMenuSwitchButton::getChildCount()
{
    return strSwitch.count();
}

void CMenuSwitchButton::paintEvent(QPaintEvent *event)
{
//    if(!isEnabledFlag)
//    {
//        QPalette palette=QPalette();
//        palette.setColor(QPalette::Background,QColor(150, 150, 150, 200));
//        setPalette(palette);
//    }
//    else if(isEnabledFlag && !this->hasFocus())
//    {
//        QPalette palette=QPalette();
//        palette.setColor(QPalette::Background,bkColor);
//        setPalette(palette);
//    }
}

void CMenuSwitchButton::showEvent(QShowEvent *event)
{
//    if(strSwitch.count() > 0)
//    {
//        strValue = 0;
//        middlepushbutton->setText(strSwitch[strValue]);
//    }

    if(strValue >= 0)
    {
        if(strValue >= 0)
        {
            if(pixmapSwitch.at(strValue) != NULL)
            {
                middlepushbuttonImage->clear();
                middlepushbuttonImage->setPixmap(*pixmapSwitch[strValue]);
//                middlepushbutton->setGeometry(QRect(this->width()*8/25, 0, this->width()*3/5, this->height()));
                middlepushbuttonImage->show();
            }
            else
            {
                if(widgetType == 0)
                {
                    middlepushbuttonImage->clear();
                    middlepushbutton->setGeometry(QRect(this->width()/5, 0, this->width()*3/5, this->height()));
                    middlepushbuttonImage->hide();
                }
            }

            int textWidth = middlepushbutton->fontMetrics().width(strSwitch[strValue]);
            if(textWidth>middlepushbutton->width())
            {
                QString str = strSwitch[strValue];
                int place = 0;
                while(1)
                {
                    place++;
                    QString tmp = str.left(place);
                    if(middlepushbutton->fontMetrics().width(tmp)>=middlepushbutton->width())
                        break;
                }
                str = str.left(place-3);
                str = str + "..";
                middlepushbutton->setText(str);
            }
            else
                middlepushbutton->setText(strSwitch[strValue]);
//            middlepushbutton->update();
        }
    }
    middlepushbutton->update();
}

void CMenuSwitchButton::resizeEvent(QResizeEvent *event)
{
    QWidget::resizeEvent(event);
    QDesktopWidget desktop;
    if(widgetType == 0)
    {
        middlepushbuttonImage->setGeometry(QRect(this->width()/5, 0, this->width()*1/25, this->height()));
        middlepushbutton->setGeometry(QRect(this->width()*6/25, 0, this->width()*3/5, this->height()));
        leftlabel->setGeometry(QRect(width()/15, (height()- 18*HEIGTHSCALENUMBER)/2, 10*WIDTHSCALENUMBER, 18*HEIGTHSCALENUMBER));
        rightlabel->setGeometry(QRect(width()*14/15-15*WIDTHSCALENUMBER, (height()- 18*HEIGTHSCALENUMBER)/2, 10*WIDTHSCALENUMBER, 18*HEIGTHSCALENUMBER));
    }
    else
    {
        if(!isSetLocation)
        {
            leftTitle->setGeometry(QRect(width()*3/10, 0, this->width()/5, this->height()));//占整体的3/5
            leftlabel->setGeometry(QRect(leftTitle->x()+leftTitle->width()+10, (height()- 18*HEIGTHSCALENUMBER)/2, 10*WIDTHSCALENUMBER, 18*HEIGTHSCALENUMBER));
            middlepushbutton->setGeometry(QRect(leftlabel->x()+leftlabel->width()+5, 0, this->width()/5 + 20, this->height()));
            rightlabel->setGeometry(QRect(middlepushbutton->x()+middlepushbutton->width()+5, (height()- 18*HEIGTHSCALENUMBER)/2, 10*WIDTHSCALENUMBER, 18*HEIGTHSCALENUMBER));
        }
        else
        {
            leftTitle->setGeometry(QRect(leftImageLocation.x()*width(), leftImageLocation.y()*height(), leftImageLocation.width()*width(), leftImageLocation.height()*height()));//占整体的3/5
            leftlabel->setGeometry(QRect(leftImageLocation.x()*width(), (height()- 18*HEIGTHSCALENUMBER)/2, 10*WIDTHSCALENUMBER, 18*HEIGTHSCALENUMBER));
            middlepushbutton->setGeometry(QRect(middleTextLocation.x()*width(), middleTextLocation.y()*height(), middleTextLocation.width()*width(), middleTextLocation.height()*height()));
            rightlabel->setGeometry(QRect(rightImageLocation.x()*width(), (height()- 18*HEIGTHSCALENUMBER)/2, 10*WIDTHSCALENUMBER, 18*HEIGTHSCALENUMBER));
        }
    }
}// end resizeEvent

void CMenuSwitchButton::keyPressEvent(QKeyEvent  *event)
{
    switch(event->key())
    {
        case CUS_ENTER:
		case CH_OK:
            //QMessageBox::about(this,tr("message"),tr("CMenuLabelPushButton press enter"));
            emit pressEnterItem(strValue);
            return ;
        case CUSP_VOLUME_DOWN:
        case CUS_LEFT:
		case CH_LEFT:
            if(strSwitch.count() != 0)
            {
                if(strValue > 0)
                {
                    strValue--;
                }
                else
                {
                    strValue = strSwitch.count()-1;
                }
                setValue(strValue);
            }
            return;
        case CUSP_VOLUME_UP:
        case CUS_RIGHT:
		case CH_RIGHT:
            if(strSwitch.count() != 0)
            {
                if(strValue<strSwitch.count()-1)
                {
                    strValue++;
                }
                else
                {
                    strValue = 0;
                }
                setValue(strValue);
            }
            return;
        default:
            break;
    }
    QWidget::keyPressEvent(event);
}

void CMenuSwitchButton::getValueSlots(int idx)
{
    if(idx >=0)
    {
        strValue = idx;
        middlepushbutton->setText(strSwitch[strValue]);
    }
    middlepushbutton->update();
}
