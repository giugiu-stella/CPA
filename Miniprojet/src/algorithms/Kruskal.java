package algorithms;

import java.awt.Point;
import java.util.ArrayList;

public class Kruskal {
	
	
  public ArrayList<Edge> kruskal(ArrayList<Point> points) {
    ArrayList<Edge> edges = new ArrayList<Edge>();
    for (Point p: points) {
      for (Point q: points) {
        if (p.equals(q) || contains(edges,p,q)){
          continue;
        }
        edges.add(new Edge(p,q));
      }
    }
    edges = sort(edges);

    ArrayList<Edge> kruskal = new ArrayList<Edge>();
    Edge current;
    NameTag forest = new NameTag(points);
    while (edges.size()!=0) {
      current = edges.remove(0);
      if (forest.tag(current.p)!=forest.tag(current.q)) {
        kruskal.add(current);
        forest.reTag(forest.tag(current.p),forest.tag(current.q));
      }
    }

    return kruskal;
  }
  
  
  private boolean contains(ArrayList<Edge> edges,Point p,Point q){
    for (Edge e:edges){
      if (e.p.equals(p) && e.q.equals(q) ||
          e.p.equals(q) && e.q.equals(p) ) return true;
    }
    return false;
  }
   Tree2D edgesToTree(ArrayList<Edge> edges, Point root) {
    ArrayList<Edge> remainder = new ArrayList<Edge>();
    ArrayList<Point> subTreeRoots = new ArrayList<Point>();
    Edge current;
    while (edges.size()!=0) {
      current = edges.remove(0);
      if (current.p.equals(root)) {
        subTreeRoots.add(current.q);
      } else {
        if (current.q.equals(root)) {
          subTreeRoots.add(current.p);
        } else {
          remainder.add(current);
        }
      }
    }

    ArrayList<Tree2D> subTrees = new ArrayList<Tree2D>();
    for (Point subTreeRoot: subTreeRoots) subTrees.add(edgesToTree((ArrayList<Edge>)remainder.clone(),subTreeRoot));

    return new Tree2D(root, subTrees);
  }
  
  private ArrayList<Edge> sort(ArrayList<Edge> edges) {
    if (edges.size()==1) return edges;

    ArrayList<Edge> left = new ArrayList<Edge>();
    ArrayList<Edge> right = new ArrayList<Edge>();
    int n=edges.size();
    for (int i=0;i<n/2;i++) { left.add(edges.remove(0)); }
    while (edges.size()!=0) { right.add(edges.remove(0)); }
    left = sort(left);
    right = sort(right);

    ArrayList<Edge> result = new ArrayList<Edge>();
    while (left.size()!=0 || right.size()!=0) {
      if (left.size()==0) { result.add(right.remove(0)); continue; }
      if (right.size()==0) { result.add(left.remove(0)); continue; }
      if (left.get(0).distance() < right.get(0).distance()) result.add(left.remove(0));
      else result.add(right.remove(0));
    }
    return result;
  }
}

class NameTag {
  private ArrayList<Point> points;
  private int[] tag;
  protected NameTag(ArrayList<Point> points){
    this.points=(ArrayList<Point>)points.clone();
    tag=new int[points.size()];
    for (int i=0;i<points.size();i++) tag[i]=i;
  }
  protected void reTag(int j, int k){
    for (int i=0;i<tag.length;i++) if (tag[i]==j) tag[i]=k;
  }
  protected int tag(Point p){
    for (int i=0;i<points.size();i++) if (p.equals(points.get(i))) return tag[i];
    return 0xBADC0DE;
  }
}