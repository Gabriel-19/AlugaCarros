import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import { Carro } from '../modelos/Carro';
import { LoadingController, AlertController } from '@ionic/angular';
import { CarrosService } from '../providers/carros.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  public carros: Carro[];

  constructor(private loadingCtrl:LoadingController,
              private alertCtrl:AlertController,
              private carrosService: CarrosService){
  }
  
  async ngOnInit() {
    const loading = await this.loadingCtrl.create({
      message:'Aguarde enquanto os carros são carregados...'
    });

    await loading.present();

    this.carrosService.lista()
    .subscribe(
      (carros)=>{
        this.carros = carros;
      },
      async (err: HttpErrorResponse)=>{
        console.log('Deu erro ' + err.status);
        const al = await this.alertCtrl.create({
          header:'Erro!',
          message: 'Erro ao listar carros',
          buttons: [{text: 'OK'}]
        });

        await al.present();
      }
    ).add(
      ()=>{
        loading.dismiss();
      }
    )
  }
}
