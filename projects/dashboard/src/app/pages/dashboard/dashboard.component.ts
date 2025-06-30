import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <div class="dashboard-header">
        <h1>Dashboard</h1>
        <p class="subtitle">Welcome to your dashboard overview</p>
      </div>
      
      <div class="dashboard-grid">
        <div class="dashboard-card">
          <div class="card-icon">
            <i class="bi bi-graph-up"></i>
          </div>
          <div class="card-content">
            <h3>Analytics</h3>
            <p class="metric">1,234</p>
            <span class="change positive">+12%</span>
          </div>
        </div>
        
        <div class="dashboard-card">
          <div class="card-icon">
            <i class="bi bi-people"></i>
          </div>
          <div class="card-content">
            <h3>Users</h3>
            <p class="metric">567</p>
            <span class="change positive">+8%</span>
          </div>
        </div>
        
        <div class="dashboard-card">
          <div class="card-icon">
            <i class="bi bi-box"></i>
          </div>
          <div class="card-content">
            <h3>Components</h3>
            <p class="metric">89</p>
            <span class="change neutral">0%</span>
          </div>
        </div>
        
        <div class="dashboard-card">
          <div class="card-icon">
            <i class="bi bi-activity"></i>
          </div>
          <div class="card-content">
            <h3>Activity</h3>
            <p class="metric">2,345</p>
            <span class="change negative">-3%</span>
          </div>
        </div>
      </div>
      
      <div class="dashboard-content">
        <div class="content-section">
          <h2>Recent Activity</h2>
          <div class="activity-list">
            <div class="activity-item">
              <i class="bi bi-plus-circle"></i>
              <span>New component added: Button</span>
              <time>2 hours ago</time>
            </div>
            <div class="activity-item">
              <i class="bi bi-pencil"></i>
              <span>Updated theme: Dark mode</span>
              <time>4 hours ago</time>
            </div>
            <div class="activity-item">
              <i class="bi bi-eye"></i>
              <span>Component viewed: Card</span>
              <time>6 hours ago</time>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .dashboard-header {
      margin-bottom: 2rem;
    }

    .dashboard-header h1 {
      font-size: 2rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 0.5rem 0;
    }

    .subtitle {
      color: var(--text-secondary);
      margin: 0;
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .dashboard-card {
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 1.5rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      transition: var(--transition);
    }

    .dashboard-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .card-icon {
      width: 48px;
      height: 48px;
      border-radius: 8px;
      background: var(--primary-color);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.25rem;
    }

    .card-content h3 {
      margin: 0 0 0.25rem 0;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .metric {
      font-size: 1.75rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 0.25rem 0;
    }

    .change {
      font-size: 0.875rem;
      font-weight: 500;
    }

    .change.positive {
      color: #10b981;
    }

    .change.negative {
      color: #ef4444;
    }

    .change.neutral {
      color: var(--text-secondary);
    }

    .dashboard-content {
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 1.5rem;
    }

    .content-section h2 {
      margin: 0 0 1rem 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .activity-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem;
      background: var(--bg-primary);
      border-radius: 6px;
    }

    .activity-item i {
      color: var(--primary-color);
      font-size: 1rem;
    }

    .activity-item span {
      flex: 1;
      color: var(--text-primary);
    }

    .activity-item time {
      color: var(--text-secondary);
      font-size: 0.875rem;
    }

    @media (max-width: 768px) {
      .dashboard-container {
        padding: 1rem;
      }

      .dashboard-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DashboardComponent {

}
