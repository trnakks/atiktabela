import { Button, Eyebrow } from '@/components/ui';
export default function NotFound() {
  return (
    <section className="container not-found">
      <Eyebrow>404 / Sayfa bulunamadı</Eyebrow>
      <h1>
        Burada henüz
        <br />
        <em>bir tabela yok.</em>
      </h1>
      <p>Aradığınız sayfa taşınmış veya bağlantı değişmiş olabilir.</p>
      <Button href="/">Ana sayfaya dön</Button>
    </section>
  );
}
