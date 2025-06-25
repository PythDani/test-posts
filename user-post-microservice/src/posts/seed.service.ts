import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async onApplicationBootstrap() {
    const count = await this.postRepository.count();
    if (count > 0) return;

    const now = Date.now();

    const posts = [
      {
        message:
          'Hoy reflexionaba sobre lo mucho que ha cambiado la tecnología en tan poco tiempo. Hace 10 años no imaginaba trabajar 100% remoto desde casa. ¡Qué locura! #RemoteWork #TechLife',
        userId: 1,
        publishedAt: new Date(now - 1000 * 60 * 60 * 1), 
      },
      {
        message:
          '¿Ya leyeron el último artículo de @vercel sobre rendimiento en aplicaciones React? Muy recomendado: https://vercel.com/blog/react-performance-tips #ReactJS #Frontend',
        userId: 2,
        publishedAt: new Date(now - 1000 * 60 * 60 * 3), 
      },
      {
        message:
          'No puedo creer lo rápido que se pasó el mes... ¿en qué momento llegamos a junio? 😵‍💫 Me siento como si aún estuviéramos en marzo.',
        userId: 3,
        publishedAt: new Date(now - 1000 * 60 * 60 * 8), 
      },
      {
        message:
          'Llevo días probando la nueva IA para resumir artículos largos... ¡una maravilla! Ya no pierdo tiempo en textos de 15 minutos. #Productividad #AI',
        userId: 1,
        publishedAt: new Date(now - 1000 * 60 * 60 * 24), 
      },
      {
        message:
          'Estoy diseñando mi primer portafolio como desarrollador frontend. ¿Qué no puede faltar sí o sí? 🤔 Se aceptan sugerencias 👇',
        userId: 2,
        publishedAt: new Date(now - 1000 * 60 * 60 * 24 * 2), 
      },
      {
        message:
          "💡 Tip rápido: si usas TailwindCSS y te cuesta organizar clases, prueba el plugin 'Headwind' en VSCode. Te ordena todo automáticamente. Te cambia la vida.",
        userId: 3,
        publishedAt: new Date(now - 1000 * 60 * 60 * 36), 
      },
      {
        message:
          'Hoy cerramos sprint en el trabajo. Mucho estrés pero valió la pena. Nada como tachar tareas del board y ver que todo funcionó al final 🔥 #SprintDone',
        userId: 1,
        publishedAt: new Date(now - 1000 * 60 * 60 * 48), 
      },
      {
        message:
          'Acabo de publicar mi primer artículo en Medium sobre accesibilidad web y diseño inclusivo. ¡Me encantaría saber qué opinan! 🧠 https://medium.com/@usuario/a11y',
        userId: 2,
        publishedAt: new Date(now - 1000 * 60 * 60 * 72), 
      },
      {
        message:
          'Siento que cada vez es más difícil desconectarse. 10 notificaciones nuevas cada vez que intento descansar 😩 ¿A alguien más le pasa?',
        userId: 3,
        publishedAt: new Date(now - 1000 * 60 * 60 * 96), 
      },
      {
        message:
          'Me lancé a crear un clon de X (Twitter) como reto personal. No es perfecto, pero aprendí muchísimo en el camino. ¡Vale la pena intentarlo! 💪',
        userId: 1,
        publishedAt: new Date(now - 1000 * 60 * 60 * 120), 
      },
      {
        message:
          '¿Por qué nadie habla del burnout en el mundo tech? Siempre se habla de productividad, pero poco de descanso. A veces hay que frenar y respirar. #SaludMental',
        userId: 2,
        publishedAt: new Date(now - 1000 * 60 * 60 * 144), 
      },
      {
        message:
          'Vengo de 3 entrevistas técnicas esta semana. Todas distintas, todas agotadoras. Pero todas me enseñaron algo. 🚀',
        userId: 3,
        publishedAt: new Date(now - 1000 * 60 * 60 * 168), 
      },
      {
        message:
          'Estoy viendo cómo implementar dark mode con TailwindCSS y es más fácil de lo que imaginaba. Recomendado: https://tailwindcss.com/docs/dark-mode',
        userId: 1,
        publishedAt: new Date(now - 1000 * 60 * 60 * 192), 
      },
      {
        message:
          'Nunca pensé que un simple botón me daría tantos bugs 😅 Pero lo logré, ¡y aprendí un montón! #JavaScriptThings',
        userId: 2,
        publishedAt: new Date(now - 1000 * 60 * 60 * 216), 
      },
      {
        message:
          'Al final del día, lo más importante es disfrutar el proceso. El código es solo una excusa para crecer 🚀❤️',
        userId: 3,
        publishedAt: new Date(now - 1000 * 60 * 60 * 240), 
      },
    ];

    await this.postRepository.save(posts);
    console.log('Dummy posts inserted');
  }
}
