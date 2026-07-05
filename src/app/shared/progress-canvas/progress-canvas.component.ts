import { AfterViewInit, Component, ElementRef, OnChanges, ViewChild, input } from '@angular/core';

import { ProgramProgress } from '../../core/models/portal.models';

@Component({
  selector: 'app-progress-canvas',
  template: '<canvas #canvas width="980" height="380" aria-label="Gráfico de avance de programas"></canvas>',
  styles: [
    `
      :host {
        display: block;
        overflow: hidden;
        border: 1px solid var(--line);
        border-radius: 8px;
        background: #fff;
      }

      canvas {
        display: block;
        inline-size: 100%;
        block-size: auto;
      }
    `,
  ],
})
export class ProgressCanvasComponent implements AfterViewInit, OnChanges {
  readonly programs = input.required<ProgramProgress[]>();

  @ViewChild('canvas')
  private canvas?: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    this.draw();
  }

  ngOnChanges(): void {
    queueMicrotask(() => this.draw());
  }

  private draw(): void {
    const canvas = this.canvas?.nativeElement;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) {
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = '900 24px ADLaM Display, Inter, Arial';
    ctx.fillStyle = '#0b1f33';
    ctx.fillText('Avance público de programas', 34, 48);

    const left = 294;
    const top = 96;
    const width = 600;
    const row = 66;
    const colors = ['#0f766e', '#2563eb', '#b68a35', '#7c3aed'];

    this.programs().forEach((item, index) => {
      const y = top + index * row;
      const barWidth = Math.round((item.progress / 100) * width);

      ctx.font = '800 14px Inter, Arial';
      ctx.fillStyle = '#334155';
      ctx.fillText(item.program, 34, y + 18);
      ctx.font = '700 12px Inter, Arial';
      ctx.fillStyle = '#64748b';
      ctx.fillText(item.owner, 34, y + 38);

      this.roundRect(ctx, left, y, width, 26, 13);
      ctx.fillStyle = '#e7eef4';
      ctx.fill();

      this.roundRect(ctx, left, y, barWidth, 26, 13);
      ctx.fillStyle = colors[index % colors.length] ?? '#0f766e';
      ctx.fill();

      ctx.font = '900 14px Inter, Arial';
      ctx.fillStyle = '#0b1f33';
      ctx.fillText(`${item.progress}%`, left + width + 18, y + 19);
    });

    ctx.font = '700 12px Inter, Arial';
    ctx.fillStyle = '#64748b';
    ctx.fillText('Canvas del piloto; puede conectarse luego a API, SQL Server o BI municipal.', 34, 352);
  }

  private roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
}
