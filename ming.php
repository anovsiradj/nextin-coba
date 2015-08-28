<?php
  // Scaling 
  Ming_setScale(20); 
  srand(time()); 

  // Creates the racket model 
  $rm = new SWFShape(); 
  $rm->setLine(5, 207, 96, 0); 
  $rm->drawLineTo(0, 1); 
  $rm->setLine(5, 255, 200, 0); 
  $rm->movePenTo(0,1); 
  $rm->drawLineTo(0, 50); 

  // Draws the white line at the middle of the screen 
  $wl = new SWFShape(); 
  $wl->setLine(8, 255, 255, 255); 
  $wl->drawLineTo(0, 480); 

  // Draws the "grass" border 
  $gm = new SWFShape(); 
  $gm->setLine(100, 48, 96, 48); 
  $gm->drawLine(640,0); 

  // Draws the ball 
  $bm = new SWFShape; 
  $bm->setLine(12, 255, 200, 0); 
  $bm->drawLine(1,1); 

  // Creates a font 
  $f=new SWFFont("arial.fdb"); 
   
  // Writes the score for player 
  $sp = new SWFTextField(); 
  $sp->setBounds(100,30); 
  $sp->setName("pScore"); 
  $sp->setFont($f); 
  $sp->setColor(255, 255, 255); 
  $sp->addString("Player : 0"); 

  // Writes the score for computer 
  $sc = new SWFTextField(); 
  $sc->setBounds(100,30); 
  $sc->setName("cScore"); 
  $sc->setFont($f); 
  $sc->setColor(255, 255, 255); 
  $sc->addString("Computer : 0"); 

  // Write the "signature" 
  $signature = new SWFText(); 
  $signature->setFont($f); 
  $signature->setColor(150, 150, 255); 
  $signature->setHeight(9); 
  $signature->addString("(c) Armel GRIGNON, october 2001 - See this script at mingshop.arpane.net"); 

  // Now adds the objects to the movie 
  // Creates the movie and the main sprite 
  $m = new SWFMovie(); 
  $m->setRate(96); 
  $m->setBackground(207, 96, 0); 
  $m->setDimension(640,480); 

  // Adds the two rackets (within sprites) 
  $srp = new SWFSprite(); 
  $srp_shape=$srp->add($rm); 
  $srp->nextFrame(); 
  $racket_player = $m->add($srp); 
  $racket_player->moveTo(10, 215); 
  $racket_player->setName("racketPlayer"); 
  $src = new SWFSprite(); 
  $src->add($rm); 
  $src->nextFrame(); 
  $racket_computer = $m->add($src); 
  $racket_computer->moveTo(630, 215); 
  $racket_computer->setName("racketComputer"); 

  // Adds the "grass" 
  $grass_top = $m->add($gm); 
  $grass_top->moveTo(0,0); 
  $grass_bottom = $m->add($gm); 
  $grass_bottom->moveTo(0,480); 

  // Adds the while line 
  $whiteline = $m->add($wl); 
  $whiteline->moveTo(316,0); 

  // Adds the ball to the movie (within a sprite) 
  $sb = new SWFSprite(); 
  $sb->add($bm); 
  $sb->nextFrame(); 
  $ball = $m->add($sb); 
  $ball->moveTo(316,240); 
  $ball->setName("zeBall"); 

  // Adds scores 
  $score_player=$m->add($sp); 
  $score_player->moveTo((320-$f->getWidth("Player : 0")/3), 20); 
  $score_computer=$m->add($sc); 
  $score_computer->moveTo(330, 20); 

  // Finally, adds signature 
  $signit = $m->add($signature); 
  $signit->moveTo(5, 460); 

  // Hides the mouse (action script code) 
  $m->add(new SWFAction('Mouse.hide();')); 
?> 