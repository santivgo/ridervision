import { CommonModule } from "@angular/common";
import { BigTitleComponent } from "../../shared/components/header/big-title/big-title.component";
import { TextTitleDirective } from "../../shared/components/header/big-title/text-title.directive";
import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';

import {MatDividerModule} from '@angular/material/divider';
@Component({
  selector: 'app-api-page',
  imports: [BigTitleComponent, TextTitleDirective, MatExpansionModule, CommonModule, MatDividerModule],
  templateUrl: './api-page.component.html',
  styleUrl: './api-page.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush,

  
})
export class ApiPageComponent {
 data = [
    {
      "id": 0,
      "name": "Kamen Rider Kuuga (TV Show)",
      "year": 2001,
      "synopsis": "Long ago, the Gurongi Tribe terrorized the Rinto (\u30ea\u30f3\u30c8, Rinto) until a warrior named Kuuga appeared and defeated the Gurongi, sealing their leader within a cave. In the present day, a multi-talented man named Yusuke Godai finds himself linked to the mysterious stoned belt that was found within the excavated cave as the Gurongi are resurrected and resume their murderous game on the descendants of the Rinto, humanity itself.\nIt is up to Yusuke, along with the assembled Science Police, to use the various powers of Kuuga to stop and defeat the Gurongi Tribesmen from their continuous killing and ensure the happiness of others. However, as the endgame draws near, Yusuke learns that there is a horrible revelation behind Kuuga and the Gurongis' leader.\n",
      "imgs": {
        "show_img_xl": "https://static.wikia.nocookie.net/kamenrider/images/7/7a/Kuuga_Poster.jpg/",
        "show_img_bg": "",
        "show_img_sm": "assets/mock/kuuga-sm.png"
      }
    },
    {
      "id": 1,
      "name": "Kamen Rider Agito (TV Show)",
      "year": 2002,
      "synopsis": "A man named Shoichi Tsugami has lost his memories. He doesn't know who he is, where he came from, or how he came upon his peculiar circumstances.\nTsugami, seemingly for no reason, transforms into a powerful superhuman, Agito, whenever in the presence of the beings referred by the police as the \"Unknown\", a race of powerful monsters that have been causing murders around Tokyo, targeting certain people as their prey.\n",
      "imgs": {
        "show_img_xl": "https://static.wikia.nocookie.net/kamenrider/images/d/d0/Agito_Poster.jpg/",
        "show_img_bg": "",
        "show_img_sm": "assets/mock/agito-sm.png"
      }
    },
    {
      "id": 2,
      "name": "Kamen Rider Ryuki (TV Show)",
      "year": 2003,
      "synopsis": "Thirteen Card Decks (\u30ab\u30fc\u30c9\u30c7\u30c3\u30ad, K\u0101do Dekki) were created for thirteen Kamen Riders. They make Contracts with monsters from the mysterious Mirror World (\u30df\u30e9\u30fc\u30ef\u30fc\u30eb\u30c9, Mir\u0101 W\u0101rudo), a parallel world opposite to the real one in which only the Kamen Riders can exist. The Riders draw on their monsters' strength in exchange for feeding them the life force of the creatures they destroy. The creator of the Advent Cards (\u30a2\u30c9\u30d9\u30f3\u30c8\u30ab\u30fc\u30c9, Adobento K\u0101do) has only one rule: that there can be only one Kamen Rider. The others must be killed, and the sole victor will be granted a single wish, which leads to a conflict known as the Rider War.\nAll over the city, innocent people are being mysteriously abducted, never to be seen again. During his investigations of these incidents, Shinji Kido \u2013 an intern at the online news service ORE Journal \u2013 discovers one of the Card Decks at an apartment where every reflective surface has been covered by the newspaper. He is soon sucked into the Mirror World, discovering the terrifying truth behind the disappearances: people are literally being pulled through mirrors by the monsters of the Mirror World so that they may feed. He is about to be killed by a powerful dragon named Dragreder when he is saved by Kamen Rider Knight: Ren Akiyama. Ren seeks to win the Rider War at all costs. He works with a young woman named Yui Kanzaki, who seeks her missing brother: the master of the Rider War, Shir\u014d Kanzaki. Seeing Ren's strength, Shinji enters the Rider War, not for the prize, but so that he may protect innocent people from the threat of the Mirror World, and stop the senseless fighting between the Kamen Riders. With Dragreder as his Contract Monster, he becomes Kamen Rider Ryuki.\n",
      "imgs": {
        "show_img_xl": "https://static.wikia.nocookie.net/kamenrider/images/7/75/Ryuki_Poster.jpg/",
        "show_img_bg": "",
        "show_img_sm": "assets/mock/ryuki-sm.png"
      }
    },
    {
      "id": 3,
      "name": "Kamen Rider 555 (TV Show)",
      "year": 2004,
      "synopsis": "The Smart Brain corporation, the world's most powerful corporation, is trying to take over the world using Orphnoch, the next stage in humanity's evolution, to covertly kill off the human population. In pursuit of this, they develop three suits of power armor, called Rider Gear (Delta, Faiz, and Kaixa), to find and protect the Orphnoch King, who can fix a defect within Orphnoch DNA which causes their genetic structure to break down, leading to death.\nThe Rider Gears are stolen by Hanagata, the Goat Orphnoch and former chief of Smart Brain. He sends them to his foster children (dubbed the Ryuseiji, after the school they attended) so they can stop the Orphnoch from achieving their goal. However, Rider Gears were designed to be worn by Orphnoch, and humans are unable to activate the systems without undergoing genetic modification.\n",
      "imgs": {
        "show_img_xl": "https://static.wikia.nocookie.net/kamenrider/images/6/64/555_Poster.jpg/",
        "show_img_bg": "",
        "show_img_sm": "assets/mock/faiz-sm.png"
      }
    },
  ]
}
